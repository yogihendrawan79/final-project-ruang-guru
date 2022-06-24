package ujian

import (
	"database/sql"

	"github.com/google/uuid"
	"github.com/rg-km/final-project-engineering-46/helper"
)

// kontrak function
type Repository interface {
	Update(input InputUjian, tokenSoal uuid.UUID) error
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
