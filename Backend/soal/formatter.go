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
