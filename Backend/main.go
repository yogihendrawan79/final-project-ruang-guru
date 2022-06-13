package main

import (
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rg-km/final-project-engineering-46/Backend/handler"
	"github.com/rg-km/final-project-engineering-46/Backend/user"
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
	// handler user
	handlerUser := handler.NewHandler(serviceUser)

	// deklarasi http server
	r := gin.Default()

	// bikin route login
	r.POST("/api/login", handlerUser.LoginUser)

	r.Run(":8080")
}
