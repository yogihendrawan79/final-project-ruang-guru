package main

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rg-km/final-project-engineering-46/auth"
	"github.com/rg-km/final-project-engineering-46/handler"
	"github.com/rg-km/final-project-engineering-46/helper"
	matapelajaran "github.com/rg-km/final-project-engineering-46/mata-pelajaran"
	"github.com/rg-km/final-project-engineering-46/soal"
	tokensoal "github.com/rg-km/final-project-engineering-46/token-soal"
	"github.com/rg-km/final-project-engineering-46/ujian"
	"github.com/rg-km/final-project-engineering-46/user"
)

func main() {
	// koneksi ke database
	db, err := sql.Open("sqlite3", "./database/exam_time.db")
	if err != nil {
		log.Fatalf("error: %v", err)
	}

	// repo user
	repoUser := user.NewRepository(db)
	//servis user
	serviceUser := user.NewService(repoUser)
	// auth user
	authUser := auth.NewServiceAuth()
	// handler user
	handlerUser := handler.NewHandlerUser(serviceUser, authUser)

	// repo token soal
	repoTokenSoal := tokensoal.NewRepository(db)
	// service token soal
	serviceTokenSoal := tokensoal.NewService(repoTokenSoal)
	// handler token soal
	handlerTokenSoal := handler.NewHandlerToken(serviceTokenSoal, serviceUser)

	// repo soal
	repoSoal := soal.NewRepository(db)
	// service soal
	serviceSoal := soal.NewService(repoSoal)
	// handler soal
	handlerSoal := handler.NewHandlerSoal(serviceSoal, serviceTokenSoal)

	// repo mata pelajaran
	repoMataPelajaran := matapelajaran.NewRepository(db)
	// service mata pelajaran
	serviceMataPelajaran := matapelajaran.NewService(repoMataPelajaran)
	// handler mata pelajaran
	handlerMataPelajaran := handler.NewHandlerMataPelajaran(serviceMataPelajaran, serviceUser)

	// repo ujian
	repoUjian := ujian.NewRepository(db)
	// service ujian
	serviceUjian := ujian.NewService(repoUjian, repoSoal, repoMataPelajaran, repoTokenSoal)
	// handler ujian
	hanlderUjian := handler.NewHandlerUjian(serviceTokenSoal, serviceUjian)

	// deklarasi http server
	r := gin.Default()

	// CORS
	r.Use(CorsMiddleware())

	// route login
	r.POST("/api/login", handlerUser.LoginUser)

	// route group
	siswa := r.Group("/api/siswa")
	{
		siswa.POST("/token", AuthMiddleware(authUser, serviceUser), handlerTokenSoal.ValidateTokenUjian)
		siswa.POST("/soal", AuthMiddleware(authUser, serviceUser), handlerSoal.ShowAllSoalSiswa)
		siswa.POST("/finish-ujian", AuthMiddleware(authUser, serviceUser), hanlderUjian.FinishUjian)

	}
	guru := r.Group("/api/guru")
	{
		guru.GET("/dashboard", AuthMiddleware(authUser, serviceUser), handlerMataPelajaran.ShowMapels)
		guru.POST("/create/soal", AuthMiddleware(authUser, serviceUser), handlerSoal.CreateSoal)
		guru.POST("/create/ujian", AuthMiddleware(authUser, serviceUser), hanlderUjian.CreateUjian)
		guru.POST("/bank-soal", AuthMiddleware(authUser, serviceUser), handlerSoal.ShowAllSoalGuru)
	}

	r.Run(":8080")
}

func AuthMiddleware(authService auth.Service, userSerivce user.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		// ambil header
		authHeader := c.GetHeader("Authorization")

		// cek apakah ada kata bearer
		if !strings.Contains(authHeader, "Bearer") {
			response := helper.ResponsAPI("Unauthorized", "Error", http.StatusUnauthorized, nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}

		// split header
		tokenString := ""
		arrayToken := strings.Split(authHeader, " ")
		if len(arrayToken) == 2 {
			tokenString = arrayToken[1]
		}

		// validasi token
		token, err := authService.ValidateToken(tokenString)
		if err != nil {
			respons := helper.ResponsAPI("Unauthorized", "Error", http.StatusUnauthorized, nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, respons)
			return
		}

		// ambil payload dalam token
		claims, ok := token.Claims.(*jwt.StandardClaims)
		if !ok || !token.Valid {
			response := helper.ResponsAPI("Unauthorized", "Error", http.StatusUnauthorized, nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}

		// ambil id dari claims
		stringID := claims.Issuer
		// convert id string ke id int
		userID, err := strconv.Atoi(stringID)
		if err != nil {
			response := helper.ResponsAPI("Unauthorized", "Error", http.StatusUnauthorized, nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
			return
		}

		// ambil data user berdasarkan id
		user, err := userSerivce.UserById(userID)

		// simpan user ke context
		c.Set("currentUser", user)
	}
}

// CORS
func CorsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		c.Writer.Header().Set("Access-Control-Allow-Method", "*")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}

		c.Next()
	}
}
