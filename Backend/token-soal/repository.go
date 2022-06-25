package tokensoal

import (
	"database/sql"
	"errors"

	"github.com/google/uuid"
	matapelajaran "github.com/rg-km/final-project-engineering-46/mata-pelajaran"
)

// kontrak
type Repository interface {
	UpdateTokenSoal(tokenSoal uuid.UUID, mapelID int) (uuid.UUID, error)
	GetMapelByToken(inputToken string) (matapelajaran.MataPelajaran, error)
	IsUsed(userID, mapelID int) (int, error)
	UpdateIsUsed(userID, mapelID int) error
}

// struct dependen ke db
type repository struct {
	db *sql.DB
}

// function NewRepository (db) *repository
func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

// implementasi kontrak
func (r *repository) UpdateTokenSoal(tokenSoal uuid.UUID, mapelID int) (uuid.UUID, error) {
	// deklarasi return
	var token uuid.UUID

	// query
	sql := `
		UPDATE mata_pelajaran set token = ? where id_mata_pelajaran = ?
	;`

	// execute query
	_, err := r.db.Exec(sql, tokenSoal, mapelID)
	if err != nil {
		return token, err
	}

	sql = `
		SELECT token FROM mata_pelajaran WHERE id_mata_pelajaran = ?
	;`

	// execute query
	data := r.db.QueryRow(sql, mapelID)

	// binding
	err = data.Scan(&token)
	if err != nil {
		return token, err
	}

	return token, nil

}

// function untuk mengambil token dan deadline
func (r *repository) GetMapelByToken(inputToken string) (matapelajaran.MataPelajaran, error) {
	// inisiasi mata pelajaran
	var mapel matapelajaran.MataPelajaran

	// query
	sql := `
		SELECT * FROM mata_pelajaran WHERE token = ?
	;`

	// execute query
	data := r.db.QueryRow(sql, inputToken)

	// binding
	err := data.Scan(
		&mapel.IdMataPelajaran,
		&mapel.MataPelajaran,
		&mapel.Token,
		&mapel.KKM,
		&mapel.Durasi,
		&mapel.Deadline,
	)
	if err != nil {
		return mapel, errors.New("token tidak terdaftar")
	}

	return mapel, nil
}

// function untuk mengambil data used token
func (r *repository) IsUsed(userID, mapelID int) (int, error) {
	// insiasi untuk return
	var used int

	// query
	sql := `
		SELECT used FROM users_mapel WHERE id_users = ? AND id_mata_pelajaran = ?
	;`

	// execute query
	data := r.db.QueryRow(sql, userID, mapelID)

	// binding
	err := data.Scan(&used)
	if err != nil {
		sqlInsert := `
			INSERT INTO users_mapel 
				(id_users, id_mata_pelajaran, used)
			VALUES
				(?, ?, false)
		;`

		// execute
		_, err = r.db.Exec(sqlInsert, userID, mapelID)
		if err != nil {
			return used, err
		}

	}

	return used, nil
}

// func untuk update status is used ketika token udah terpakai oleh user tertentu
func (r *repository) UpdateIsUsed(userID, mapelID int) error {
	// query
	sql := `
		UPDATE users_mapel set used = true
		WHERE id_users = ? AND id_mata_pelajaran = ?
	;`

	// exec
	_, err := r.db.Exec(sql, userID, mapelID)
	if err != nil {
		return err
	}

	return nil
}
