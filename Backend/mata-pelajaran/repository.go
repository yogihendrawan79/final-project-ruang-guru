package matapelajaran

import "database/sql"

// bikin kontrak
type Repository interface {
	ShowAllMapel() ([]MataPelajaran, error)
	ShowMapelByIdMapel(mapelID int) (MataPelajaran, error)
}

// bikin struct dependen ke koneksi database
type repository struct {
	db *sql.DB
}

// bikin func newMapel
func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

// implement kontrak yang dimiliki struct
func (r *repository) ShowAllMapel() ([]MataPelajaran, error) {
	// inisiai MataPelajaran
	var mapels []MataPelajaran

	// query
	sql := `
		SELECT * FROM mata_pelajaran
	;`

	// exec
	data, err := r.db.Query(sql)
	if err != nil {
		return mapels, err
	}

	// loop & binding
	for data.Next() {
		// bikin singular mapels
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
			return mapels, err
		}

		// append singular ke slice of matapelajaran
		mapels = append(mapels, mapel)
	}

	// return
	return mapels, nil
}

// func get mapel by id
func (r *repository) ShowMapelByIdMapel(mapelID int) (MataPelajaran, error) {
	var mapel MataPelajaran
	// query
	sql := `
	SELECT * FROM mata_pelajaran
	WHERE
		id_mata_pelajaran = ?
	;`

	// exec
	data := r.db.QueryRow(sql, mapelID)

	// scan
	err := data.Scan(
		&mapel.IdMataPelajaran,
		&mapel.MataPelajaran,
		&mapel.Token,
		&mapel.KKM,
		&mapel.Durasi,
		&mapel.Deadline,
	)

	if err != nil {
		return mapel, err
	}

	return mapel, nil
}
