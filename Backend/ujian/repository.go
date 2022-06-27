package ujian

import (
	"database/sql"

	"github.com/google/uuid"
	"github.com/rg-km/final-project-engineering-46/helper"
)

// kontrak function
type Repository interface {
	Update(input InputUjian, tokenSoal uuid.UUID) error
	SaveAnswer(input Jawaban, userID int) error
	SaveScore(input InputScore, userID int) int
	SaveReport(userID, mapelID, scoreID int, status string) error
	KillUjian() error
}

// struct dependen ke koneksi database
type repository struct {
	db *sql.DB
}

// func newrepo ujian
func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

// implement kontrak
func (r *repository) Update(input InputUjian, tokenSoal uuid.UUID) error {

	// conversi deadline ke tipe time.Time
	deadline, err := helper.ConvetToTime(input.Deadline)
	if err != nil {
		return err
	}

	// query
	sql := `
		UPDATE mata_pelajaran 
		SET 
			token = ?,
			kkm = ?,
			durasi = ?,
			deadline = ?
		WHERE
			id_mata_pelajaran = ?
	;`

	// execute query
	_, err = r.db.Exec(sql, tokenSoal, input.KKM, input.Durasi, deadline, input.IdMataPelajaran)
	if err != nil {
		return err
	}

	return nil
}

// function save data jawaban siswa
func (r *repository) SaveAnswer(input Jawaban, userID int) error {

	// query
	sql := `
		INSERT INTO jawaban_siswa
			(id_soal, id_users, jawaban)
		VALUES
			(?, ?, ?)
	;`

	// exec
	_, err := r.db.Exec(sql, input.IdSoal, userID, input.Answer)
	if err != nil {
		return err
	}

	return nil
}

// func save score siswa
func (r *repository) SaveScore(input InputScore, userID int) int {
	// id
	var id int

	// query
	sql := `
		INSERT INTO scores 
			(id_users, id_mata_pelajaran,nilai)
		VALUES
		(?, ?,?)
		RETURNING id_scores
	;`

	// exec
	data := r.db.QueryRow(sql, userID, input.IdMataPelajaran, input.Nilai)
	data.Scan(
		&id,
	)

	return id
}

// func untuk menyimpan data ke table report
func (r *repository) SaveReport(userID, mapelID, scoreID int, status string) error {
	// query
	sql := `
		INSERT INTO report 
			(id_users, id_mata_pelajaran, id_scores, status)
		VALUES
			(?, ?, ?, ?)
	;`

	// exec
	_, err := r.db.Exec(sql, userID, mapelID, scoreID, status)
	if err != nil {
		return err
	}
	return nil
}

// function untuk mengakhiri kegiatan ujian (misal kegiatan ujian selama 1 minggu sudah selesai, ini akan mentruncate table users_mapel) dengan tujuan di next ujian atribut used di table users_mapel kembali default menjadi false agar token lolos validasi
func (r *repository) KillUjian() error {
	// query

	sql := `
       DELETE FROM opsi_soal;
	   DELETE FROM soal;
	   DELETE FROM users_mapel;
	   DELETE FROM jawaban_siswa;
	   DELETE FROM scores;
<<<<<<< HEAD
	   DELETE FROM report
=======
	   DELETE FROM report;
	   DELETE FROM sqlite_sequence WHERE name = 'soal';
	   DELETE FROM sqlite_sequence WHERE name = 'opsi_soal'
>>>>>>> 3fdb9da93a96f16d1a128b22609f065e0bd7b39d

	;`

	_, err := r.db.Exec(sql)
	if err != nil {
		return err
	}

	// return
	return nil
}
