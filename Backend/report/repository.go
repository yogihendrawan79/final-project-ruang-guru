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
	SELECT users.nama, mata_pelajaran.mata_pelajaran, scores.nilai, report.status FROM report 
	JOIN users ON report.id_users = users.id_users
	JOIN mata_pelajaran ON report.id_mata_pelajaran = mata_pelajaran.id_mata_pelajaran
	JOIN scores ON report.id_scores = scores.id_scores 
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
