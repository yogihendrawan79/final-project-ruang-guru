package main

import (
	"log"

	_ "github.com/mattn/go-sqlite3"
	"github.com/rg-km/final-project-engineering-46/Backend/database/connection"
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

	CreateTableSiswa := `
		CREATE TABLE IF NOT EXISTS siswas (
			id_siswa INTEGER PRIMARY KEY AUTOINCREMENT, 
			nama  VARCHAR(50),
			nisn VARCHAR(10),
			role VARCHAR(10),
			email VARCHAR(20),
			password TEXT,
			nilai INT
		)
	;
	`
	CreateTableGuru := `
		CREATE TABLE IF NOT EXISTS gurus (
			id_guru INTEGER PRIMARY KEY AUTOINCREMENT, 
			nama  VARCHAR(50),
			nip VARCHAR(10),
			role VARCHAR(10),
			email VARCHAR(20),
			password TEXT
		)
	;`
	// enkripsi password
	passJohn, _ := bcrypt.GenerateFromPassword([]byte("john123456"), 10)
	passWick, _ := bcrypt.GenerateFromPassword([]byte("wick123456"), 10)
	passCarl, _ := bcrypt.GenerateFromPassword([]byte("carl123456"), 10)
	passStephan, _ := bcrypt.GenerateFromPassword([]byte("stephan123456"), 10)
	passGusti, _ := bcrypt.GenerateFromPassword([]byte("gusti123456"), 10)

	//insert data siswa
	InsertSiswa := `
		INSERT INTO siswas 
			(nama, nisn, role, email, password) 
		VALUES 
			("john", "17654140", "siswa", "john@gmail.com", ?),
			("wick", "17654141", "siswa", "wick@gmail.com", ?),
			("carl", "17654142", "siswa", "carl@gmail.com", ?),
			("stephan", "17654143", "siswa", "stephan@gmail.com", ?)
	;`
	InsertGuru := `
		INSERT INTO gurus 
			(nama, nip, role, email, password) 
		VALUES 
			("gusti", "12345678", "guru", "john@gmail.com", ?)
	;`

	// execute sql create table siswa
	_, err = db.Exec(CreateTableSiswa)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}
	// execute sql create table guru
	_, err = db.Exec(CreateTableGuru)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}
	// execute sql insert table siswa
	_, err = db.Exec(InsertSiswa, string(passJohn), string(passWick), string(passCarl), string(passStephan))
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}
	// execute sql insert table guru
	_, err = db.Exec(InsertGuru, string(passGusti))
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}
}

func main() {
	Migration()
}
