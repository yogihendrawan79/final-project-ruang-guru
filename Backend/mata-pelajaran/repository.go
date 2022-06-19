package matapelajaran

import (
	"database/sql"
)

// bikin kontrak
type Repository interface {
	Save(input MataPelajaran) error
	GetTokenSoal(input string) (MataPelajaran, error)
}

// bikin strut
type repository struct {
	db *sql.DB
}

// newrepsitory
func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

// function untuk mengambil token soal
func (r *repository) GetTokenSoal(input string) (MataPelajaran, error) {
	// inisiasi entity mata pelajaran
	var mataPelajaran MataPelajaran
	// query
	sql := `
		SELECT * from mata_pelajaran WHERE token = ?
	;`

	// execute query
	data, err := r.db.Query(sql, input)
	if err != nil {
		return mataPelajaran, err
	}

	// binding
	for data.Next() {
		var mapel MataPelajaran
		err := data.Scan(
			&mapel.IdMataPelajaran,
			&mapel.MataPelajaran,
			&mapel.Token,
			&mapel.KKM,
			&mapel.Durasi,
			&mapel.Deadline,
		)

		if err != nil {
			return mataPelajaran, err
		}

		mataPelajaran = mapel
	}

	return mataPelajaran, nil
}
