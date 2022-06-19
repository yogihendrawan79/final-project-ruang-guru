package soal

import "database/sql"

// kontrak
type Repository interface {
	Save(input InputSoal) (string, error)
}

// struct repository
type repository struct {
	db *sql.DB
}

// function NewRepository
func NewRepository(db *sql.DB) *repository {
	return &repository{db}
}

// bikin function untuk save data opsi soal ke table opsi_soal
// func (r *repository) Save(input InputSoal) (string, error) {

// 	// query input opsi soal
// 	sqlInputOpsiSoal := `INSERT INTO opsi_soal (id_mata_pelajaran, id_opsi_soal, id_users, pertanyaan, kunci_jawaban) VALUES (?, ?, ?, ?, ?)`


// 	sql := `
// 	INSERT INTO  soal (id_mata_pelajaran, id_opsi_soal, id_users, kunci_jawaban, pertanyaan)
// 	VALUES
// 	(?,?,?,?,?)
// 	;`

// 	// execute query
// 	_, err := r.db.Exec(sql, input.IdMataPelajaran, input., input.IdUsers, input.KunciJawaban, input.Pertanyaan)

// 	if err != nil {
// 		return "gagal input", err
// 	}

// 	// return
// 	return "berhasil input", nil
// }
