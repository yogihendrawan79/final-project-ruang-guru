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
	handlerUser := handler.NewHandler(serviceUser, authUser)

	// deklarasi http server
	r := gin.Default()

	// route login
	r.POST("/api/login", handlerUser.LoginUser)
	// route logout
	r.GET("/api/logout", AuthMiddleware(authUser, serviceUser), handlerUser.LogoutUser)

	// route group
	siswa := r.Group("/api/siswa")
	{
		siswa.GET("/home", AuthMiddleware(authUser, serviceUser), handlerUser.HomeSiswa)
	}
	guru := r.Group("/api/guru")
	{
		guru.GET("/home", AuthMiddleware(authUser, serviceUser), handlerUser.HomeGuru)
	}

	r.Run(":8080")
}

func AuthMiddleware(authService auth.Service, userSerivce user.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		// ambil header
		authHeader := c.GetHeader("Authorization")

		// cek apakah ada kata bearer
		if !strings.Contains(authHeader, "Bearer") {
			respons := helper.ResponsAPI("Unauthorized", "Error", http.StatusUnauthorized, nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, respons)
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
			respons := helper.ResponsAPI("Unauthorized", "Error", http.StatusUnauthorized, nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, respons)
			return
		}

		// ambil id dari claims
		stringID := claims.Issuer
		// convert id string ke id int
		id_user, err := strconv.Atoi(stringID)
		if err != nil {
			respons := helper.ResponsAPI("Unauthorized", "Error", http.StatusUnauthorized, nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, respons)
			return
		}

		// ambil data user berdasarkan id
		user, err := userSerivce.UserById(id_user)

		// simpan user ke context
		c.Set("currentUser", user)
	}
}
