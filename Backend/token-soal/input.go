package tokensoal

// struct input token oleh siswa untuk mendaptkan semua list soal
type InputTokenSiswa struct {
	Token string `json:"token" binding:"required"`
}
