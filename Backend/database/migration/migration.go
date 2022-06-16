package main

import (
	"log"

	_ "github.com/mattn/go-sqlite3"
	"github.com/rg-km/final-project-engineering-46/database/connection"
	"golang.org/x/crypto/bcrypt"
)

// function untuk migrasi database
func Migration() {

	// dapatkan koneksi ke database
	db, err := connection.ConnectionToDB()
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}

	CreateTableUsers := `
		CREATE TABLE IF NOT EXISTS users (
			id_users INTEGER PRIMARY KEY AUTOINCREMENT, 
			nama  VARCHAR(20),
			role VARCHAR(10),
			email VARCHAR(20),
			password TEXT,
			avatar TEXT
		)
	;
	`
	// enkripsi password
	passJohn, _ := bcrypt.GenerateFromPassword([]byte("john123456"), 10)
	passWick, _ := bcrypt.GenerateFromPassword([]byte("wick123456"), 10)
	passCarl, _ := bcrypt.GenerateFromPassword([]byte("carl123456"), 10)
	passStephan, _ := bcrypt.GenerateFromPassword([]byte("stephan123456"), 10)
	passSally, _ := bcrypt.GenerateFromPassword([]byte("sally123456"), 10)

	//insert data siswa
	InsertUsers := `
		INSERT INTO users 
			(nama, role, email, password, avatar) 
		VALUES 
			("john", "siswa", "john@gmail.com", ?, "https://images.unsplash.com/photo-1547082661-71362fc3969c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"),
			("wick", "siswa", "wick@gmail.com", ?, "https://images.unsplash.com/photo-1552457309-e45be97707ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=823&q=80"),
			("carl",  "siswa", "carl@gmail.com", ?, "https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"),
			("stephan", "siswa", "stephan@gmail.com", ?, "https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"),
			("sally",  "guru", "sally@gmail.com", ?, "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
			

	;`
	// execute sql create table siswa
	_, err = db.Exec(CreateTableUsers)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}
	// execute sql insert table siswa
	_, err = db.Exec(InsertUsers, string(passJohn), string(passWick), string(passCarl), string(passStephan), string(passSally))
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}

}

func main() {
	Migration()
}
