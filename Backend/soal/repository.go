package soal

import (
	"database/sql"
)

// kontrak
type Repository interface {
	Save(inputSoal InputSoal, userID int) error
	GetAllSoalSiswa(mapelID int) ([]SoalSiswa, error)
	GetAllSoalGuru(mapelID int) ([]SoalGuru, error)
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
func (r *repository) Save(inputSoal InputSoal, userID int) error {
	// query input opsi soal
	query := `
		INSERT INTO opsi_soal 
			(opsi_a, opsi_b, opsi_c, opsi_d) 
		VALUES 
			(?, ?, ?, ?)
	;`

	// exec query input opsi soal
	_, err := r.db.Exec(query, inputSoal.OpsiJawaban.OpsiA, inputSoal.OpsiJawaban.OpsiB, inputSoal.OpsiJawaban.OpsiC, inputSoal.OpsiJawaban.OpsiD)
	if err != nil {
		return err
	}

	// query input soal
	query = `
		INSERT INTO soal 
			(id_mata_pelajaran, id_opsi_soal, id_users, kunci_jawaban, pertanyaan)
		VALUES (?, ?, ?, ?, ?);`

	// exec query input soal
	_, err = r.db.Exec(query, inputSoal.IdMataPelajaran, inputSoal.IdOpsiSoal, userID, inputSoal.KunciJawaban, inputSoal.Pertanyaan)
	if err != nil {
		return err
	}

	return nil
}

// function untuk get semua soal berdasarkan mapelID
func (r *repository) GetAllSoalSiswa(mapelID int) ([]SoalSiswa, error) {
	// inisiasi struct soal siswa
	var allSoal []SoalSiswa

	// query
	sql := `
		SELECT s.id_soal, s.pertanyaan, os.opsi_a, os.opsi_b, os.opsi_c, os.opsi_d FROM soal as s
		JOIN opsi_soal as os on s.id_opsi_soal = os.id_opsi_soal
		WHERE id_mata_pelajaran = ?
	;`

	// execute query
	data, err := r.db.Query(sql, mapelID)
	if err != nil {
		return allSoal, err
	}

	// binding
	for data.Next() {
		var soal SoalSiswa
		err := data.Scan(
			&soal.IdSoal,
			&soal.Pertanyaan,
			&soal.Opsi.OpsiA,
			&soal.Opsi.OpsiB,
			&soal.Opsi.OpsiC,
			&soal.Opsi.OpsiD,
		)
		if err != nil {
			return allSoal, err
		}

		allSoal = append(allSoal, soal)
	}

	return allSoal, nil

}

// function get all soal guru (bank soal)
func (r *repository) GetAllSoalGuru(mapelID int) ([]SoalGuru, error) {
	// inisasi return
	var allSoal []SoalGuru

	// query
	sql := `
	SELECT 
		soal.id_soal,pertanyaan,kunci_jawaban,opsi_a, opsi_b, opsi_c, opsi_d  
	FROM 
		soal
	JOIN 
		opsi_soal on soal.id_opsi_soal = opsi_soal.id_opsi_soal
	WHERE 
		id_mata_pelajaran = ?
	;`

	// execute
	data, err := r.db.Query(sql, mapelID)
	if err != nil {
		return allSoal, err
	}

	// binding
	for data.Next() {
		var soal SoalGuru
		err := data.Scan(
			&soal.IdSoal,
			&soal.Pertanyaan,
			&soal.KunciJawaban,
			&soal.Opsi.OpsiA,
			&soal.Opsi.OpsiB,
			&soal.Opsi.OpsiC,
			&soal.Opsi.OpsiD,
		)

		if err != nil {
			return allSoal, err
		}

		allSoal = append(allSoal, soal)
	}

	return allSoal, nil
}
