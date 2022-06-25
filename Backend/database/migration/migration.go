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

	createTableUsers := `
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

	createTableMataPelajaran := `
		CREATE TABLE IF NOT EXISTS mata_pelajaran (
			id_mata_pelajaran INTEGER PRIMARY KEY AUTOINCREMENT, 
			mata_pelajaran VARCHAR(50),
			token UUID,
			kkm int,
			durasi string,
			deadline datetime
		)
		;`

	createTableSoal := `
		CREATE TABLE IF NOT EXISTS soal (
			id_soal INTEGER PRIMARY KEY AUTOINCREMENT,
			id_mata_pelajaran int,
			id_opsi_soal int,
			id_users int,
			kunci_jawaban VARCHAR(3),
			pertanyaan TEXT,
			FOREIGN KEY (id_mata_pelajaran) REFERENCES mata_pelajaran(id_mata_pelajaran),
			FOREIGN KEY (id_opsi_soal) REFERENCES opsi_soal(id_opsi_soal),
			FOREIGN KEY (id_users) REFERENCES users(id_users)
		)
		;`

	createTableOpsiSoal := `
		CREATE TABLE IF NOT EXISTS opsi_soal (
			id_opsi_soal INTEGER PRIMARY KEY AUTOINCREMENT,
			opsi_a VARCHAR(3),
			opsi_b VARCHAR(3),
			opsi_c VARCHAR(3),
			opsi_d VARCHAR(3)
		)
	;`

	createTableUsersMapel := `
		CREATE TABLE IF NOT EXISTS users_mapel (
			id_users_mapel INTEGER PRIMARY KEY AUTOINCREMENT,
			id_users int,
			id_mata_pelajaran int,
			used bool,
			FOREIGN KEY (id_users) REFERENCES users(id_users),
			FOREIGN KEY (id_mata_pelajaran) REFERENCES mata_pelajaran(id_mata_pelajaran)
		)
	;`
	createTableJawabanSiswa := `
		CREATE TABLE IF NOT EXISTS jawaban_siswa (
			id_jawaban_siswa INTEGER PRIMARY KEY AUTOINCREMENT,
			id_soal int,
			id_users int,
			jawaban VARCHAR(3),
			FOREIGN KEY (id_soal) REFERENCES soal(id_soal),
			FOREIGN KEY (id_users) REFERENCES users(id_users)
		)
	;`

	createTableScores := `
		CREATE TABLE IF NOT EXISTS scores (
			id_scores INTEGER PRIMARY KEY AUTOINCREMENT,
			id_users int,
			id_mata_pelajaran int,
			nilai int,
			FOREIGN KEY (id_users) REFERENCES users(id_users)
			FOREIGN KEY (id_mata_pelajaran) REFERENCES mata_pelajaran(id_mata_pelajaran)
		)
	;`

	createTableReport := `
		CREATE TABLE IF NOT EXISTS report (
			id_report INTEGER PRIMARY KEY AUTOINCREMENT,
			id_users int,
			id_mata_pelajaran int,
			id_scores int,
			status varchar,
			FOREIGN KEY (id_users) REFERENCES users(id_users)
			FOREIGN KEY (id_mata_pelajaran) REFERENCES mata_pelajaran(id_mata_pelajaran)
			FOREIGN KEY (id_scores) REFERENCES scores(id_scores)
		)
	;`

	// enkripsi password
	passJohn, _ := bcrypt.GenerateFromPassword([]byte("john123456"), 10)
	passWick, _ := bcrypt.GenerateFromPassword([]byte("wick123456"), 10)
	passCarl, _ := bcrypt.GenerateFromPassword([]byte("carl123456"), 10)
	passStephan, _ := bcrypt.GenerateFromPassword([]byte("stephan123456"), 10)
	passSally, _ := bcrypt.GenerateFromPassword([]byte("sally123456"), 10)

	//insert data siswa
	insertUsers := `
		INSERT INTO users 
			(nama, role, email, password, avatar) 
		VALUES 
			("John", "siswa", "john@gmail.com", ?, "https://images.unsplash.com/photo-1547082661-71362fc3969c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"),
			("Wick", "siswa", "wick@gmail.com", ?, "https://images.unsplash.com/photo-1552457309-e45be97707ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=823&q=80"),
			("Carl",  "siswa", "carl@gmail.com", ?, "https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"),
			("Stephan", "siswa", "stephan@gmail.com", ?, "https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"),
			("Sally",  "guru", "sally@gmail.com", ?, "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
			

	;`

	// insert data mata pelajaran
	insertMataPelajaran := `
		INSERT INTO mata_pelajaran 
			(mata_pelajaran, token, kkm, durasi, deadline)
		VALUES 
			("Matematika", "", 0, "", ""),
			("IPA", "", 0, "", ""),
			("IPS", "", 0, "", "")
	;`

	// execute sql create table siswa
	_, err = db.Exec(createTableUsers)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}

	// execute sql create table mata_pelajaran
	_, err = db.Exec(createTableMataPelajaran)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}

	// execute sql create table opsi_soal
	_, err = db.Exec(createTableOpsiSoal)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}

	// execute sql create table soal
	_, err = db.Exec(createTableSoal)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}

	//execute sql create table users_mapel
	_, err = db.Exec(createTableUsersMapel)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}

	//execute sql create table jawaban_siswa
	_, err = db.Exec(createTableJawabanSiswa)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}

	//execute sql create table scores
	_, err = db.Exec(createTableScores)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}

	//execute sql create table report
	_, err = db.Exec(createTableReport)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}

	// execute sql insert table siswa
	_, err = db.Exec(insertUsers, string(passJohn), string(passWick), string(passCarl), string(passStephan), string(passSally))
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}

	// execute sql insert table mata pelajaran
	_, err = db.Exec(insertMataPelajaran)
	if err != nil {
		log.Fatalf("error: %v", err)
		return
	}
}

func main() {
	Migration()
}
