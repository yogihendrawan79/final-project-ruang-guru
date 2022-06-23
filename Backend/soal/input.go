package soal

// struct input create soal
type InputSoal struct {
	IdMataPelajaran int      `json:"id_mata_pelajaran" binding:"required"`
	IdOpsiSoal      int      `json:"id_opsi_soal" binding:"required"`
	Pertanyaan      string   `json:"pertanyaan" binding:"required"`
	KunciJawaban    string   `json:"kunci_jawaban" binding:"required"`
	OpsiJawaban     OpsiSoal `json:"opsi_jawaban" binding:"required"`
}

type OpsiSoal struct {
	OpsiA string `json:"opsi_a" binding:"required"`
	OpsiB string `json:"opsi_b" binding:"required"`
	OpsiC string `json:"opsi_c" binding:"required"`
	OpsiD string `json:"opsi_d" binding:"required"`
}

// struct input bank soal
type InputBankSoal struct {
	IdMataPelajaran int `json:"id_mata_pelajaran" binding:"required"`
}
