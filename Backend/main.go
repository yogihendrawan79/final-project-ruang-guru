package main

import (
	"database/sql"
	"log"
	"net/http"

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
	r.GET("/api/logout", AuthMiddleware(authUser), handlerUser.LogoutUser)

	// route group
	siswa := r.Group("/api/siswa")
	{
		siswa.GET("/home", AuthMiddleware(authUser), handlerUser.HomeSiswa)
	}
	guru := r.Group("/api/guru")
	{
		guru.GET("/home", AuthMiddleware(authUser), handlerUser.HomeGuru)
	}

	r.Run(":8080")
}

func AuthMiddleware(authUser auth.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		// ambil cookie
		cookie, err := c.Cookie("jwt")

		if err != nil {
			myErr := gin.H{
				"error": "cookie tidak terdeteksi",
			}
			respons := helper.ResponsAPI("Gagal mengambil cookie", "Unauthorized", http.StatusUnauthorized, myErr)
			c.AbortWithStatusJSON(http.StatusUnauthorized, respons)
			return
		}

		// parsing cookie dan validasi token
		token, err := authUser.ValidateToken(cookie)
		if err != nil {
			myErr := gin.H{
				"error": err.Error(),
			}
			respons := helper.ResponsAPI("Token tidak valid", "Unauthorized", http.StatusUnauthorized, myErr)
			c.AbortWithStatusJSON(http.StatusUnauthorized, respons)
			return
		}

		// ambil payload
		claims := token.Claims.(*jwt.StandardClaims)
		// ambil id user
		id_user := claims.Issuer

		// set context
		c.Set("current_user", id_user)

	}
}
