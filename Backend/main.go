package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/dgrijalva/jwt-go/v4"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rg-km/final-project-engineering-46/auth"
	"github.com/rg-km/final-project-engineering-46/handler"
	"github.com/rg-km/final-project-engineering-46/helper"

	// "github.com/rg-km/final-project-engineering-46/opsi-soal"

	// matapelajaran "github.com/rg-km/final-project-engineering-46/mata-pelajaran"
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

	// // deklarasi NewRepo opsi soal
	// repoOpsiSoal := opsisoal.NewRepository(db)
	// // bikinin input opsi soal tipe InputOpsiSoal
	// input := opsisoal.InputOpsiSoal{
	// 	OpsiA: "Ikan",
	// 	OpsiB: "Burung",
	// 	OpsiC: "Domba",
	// 	OpsiD: "Kucing",
	// }
	// // panggil function save di repo
	// opsisoal, err := repoOpsiSoal.Save(input)
	// if err != nil {
	// 	log.Printf("error : %v", err)
	// }
	// log.Println(opsisoal)

	// // repoMapel := matapelajaran.NewRepository(db)
	// // // create token
	// // serviceMapel := matapelajaran.NewSerivce(repoMapel)
	// // token, err := serviceMapel.GenerateTokenSoal()
	// // if err != nil {
	// // 	log.Fatalf("error: %v", err)
	// // }

	// // // validasi token
	// // valid, err := serviceMapel.ValidasiTokenSoal(token.String())
	// // if err != nil {
	// // 	log.Printf("error: %v", err)
	// // }

	// // log.Printf("token: %v", valid)

	// // log.Printf("token berhasil dibuat: %v", token)
	// return

	// deklarasi http server
	r := gin.Default()

	// port
	port := ":" + os.Getenv("PORT")

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

	r.Run(port)
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
