package soal

// struct untuk menampilkan semua soal ke siswa
type SoalSiswa struct {
	IdSoal     int      `json:"id_soal"`
	Pertanyaan string   `json:"pertanyaan"`
	Opsi       OpsiSoal `json:"opsi"`
}

// struct untuk menampilkan semua soal ke guru
type SoalGuru struct {
	IdSoal       int      `json:"id_soal"`
	Pertanyaan   string   `json:"pertanyaan"`
	KunciJawaban string   `json:"kunci_jawaban"`
	Opsi         OpsiGuru `json:"opsi"`
}

type OpsiGuru struct {
	OpsiA string `json:"opsi_a"`
	OpsiB string `json:"opsi_b"`
	OpsiC string `json:"opsi_c"`
	OpsiD string `json:"opsi_d"`
}

// format response soal guru (bank soal)
func FormatterBankSoal(soal SoalGuru) SoalGuru {
	var allSoal SoalGuru

	allSoal.IdSoal = soal.IdSoal
	allSoal.KunciJawaban = soal.KunciJawaban
	allSoal.Pertanyaan = soal.Pertanyaan
	allSoal.Opsi.OpsiA = soal.Opsi.OpsiA
	allSoal.Opsi.OpsiB = soal.Opsi.OpsiB
	allSoal.Opsi.OpsiC = soal.Opsi.OpsiC
	allSoal.Opsi.OpsiD = soal.Opsi.OpsiD

	return allSoal
}
func FormatterBankSoals(soals []SoalGuru) []SoalGuru {
	allSoal := []SoalGuru{}
	for _, soal := range soals {
		formaterBankSoal := FormatterBankSoal(soal)
		allSoal = append(allSoal, formaterBankSoal)
	}

	return allSoal
}
