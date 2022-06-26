package ujian

// struct input ujian
type InputUjian struct {
	IdMataPelajaran int    `json:"id_mata_pelajaran" binding:"required"`
	KKM             int    `json:"kkm" binding:"required"`
	Deadline        string `json:"deadline" binding:"required"`
	Durasi          int    `json:"durasi" binding:"required"`
}

// struct untuk menampung jawaban siswa
type InputFinishUjian struct {
	IdMataPelajaran int       `json:"id_mata_pelajaran" binding:"required"`
	Jawabans        []Jawaban `json:"jawabans" binding:"required"`
}

type Jawaban struct {
	Answer string `json:"answer" binding:"required"`
	IdSoal int    `json:"id_soal" binding:"required"`
}

// struct input untuk scores
type InputScore struct {
	IdMataPelajaran int `json:"id_mata_pelajaran" binding:"required"`
	Nilai           int `json:"nilai" binding:"required"`
}

// data : {
// 	"mapel" : "matematika",
// 	"id_mapel" : 1,
// 	"jawabans" := [
// 		{
// 			"answer" : "A"
// 			"id_soal" : 1
// 		},
// 		{
// 			"answer" : "B"
// 			"id_soal" : 2
// 		}
// 	]
// }
