package report

//struct respon report
type ResponseReport struct {
	Nama          string `json:"nama"`
	MataPelajaran string `json:"mata_pelajaran"`
	Nilai         int    `json:"nilai"`
	Status        string `json:"status"`
}
