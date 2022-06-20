package soal

// struct untuk menampilkan semua soal ke siswa
type SoalSiswa struct {
	IdSoal     int      `json:"id_soal"`
	Pertanyaan string   `json:"pertanyaan"`
	Opsi       OpsiSoal `json:"opsi"`
}
