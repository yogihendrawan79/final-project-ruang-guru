package soal

// struct opsi soal
type Soal struct {
	IdSoal          int
	IdMataPelajaran int
	IdOpsiSoal      int
	IdUsers         int
	KunciJawaban    string
	Pertanyaan      string
}

type Opsi struct {
	IdOpsi int
	OpsiA  string
	OpsiB  string
	OpsiC  string
	OpsiD  string
}
