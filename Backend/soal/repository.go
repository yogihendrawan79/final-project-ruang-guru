package soal

import "database/sql"

// kontrak
type Repository interface {
	Save(inputSoal InputSoal) error
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
func (r *repository) Save(inputSoal InputSoal) error {
	// query input opsi soal
	query := "INSERT INTO opsi_soal (opsi_a, opsi_b, opsi_c, opsi_d) VALUES (?, ?, ?, ?)"

	// exec query input opsi soal
	_, err := r.db.Exec(query, inputSoal.OpsiJawaban.OpsiA, inputSoal.OpsiJawaban.OpsiB, inputSoal.OpsiJawaban.OpsiC, inputSoal.OpsiJawaban.OpsiD)
	if err != nil {
		return err
	}

	// query input soal
	query = "INSERT INTO soal (id_mata_pelajaran, id_opsi_soal, id_users, kunci_jawaban, pertanyaan) VALUES (?, ?, ?, ?, ?)"

	// exec query input soal
	_, err = r.db.Exec(query, inputSoal.IdMataPelajaran, inputSoal.IdOpsiSoal, inputSoal.IdUsers, inputSoal.KunciJawaban, inputSoal.Pertanyaan)
	if err != nil {
		return err
	}

	return nil
}
