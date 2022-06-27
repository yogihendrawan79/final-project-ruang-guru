package report

import "database/sql"

// bikin kontrak function
type Repository interface {
	ShowReport(input InputReport) ([]ResponseReport, error)
}

// bikin repo dependen ke koneksi database
type repository struct {
	db *sql.DB
}

// bikin newRepo
func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

// implemen kontrak
func (r *repository) ShowReport(input InputReport) ([]ResponseReport, error) {
	// inisiasi return
	var results []ResponseReport

	// query
	sql := `
	SELECT 
	    u.nama, mp.mata_pelajaran, s.nilai, r.status 
	FROM 
	    report as r
	JOIN users as u ON r.id_users = u.id_users
	JOIN mata_pelajaran as mp ON r.id_mata_pelajaran = mp.id_mata_pelajaran
	JOIN scores as s ON r.id_scores = s.id_scores 
	WHERE 
	    r.id_mata_pelajaran = ?
	;`

	// exec
	data, err := r.db.Query(sql, input.IdMataPelajaran)
	if err != nil {
		return results, err
	}

	// scan
	for data.Next() {
		var result ResponseReport
		err := data.Scan(
			&result.Nama,
			&result.MataPelajaran,
			&result.Nilai,
			&result.Status,
		)
		if err != nil {
			return results, err
		}
		results = append(results, result)
	}
	return results, nil
}
