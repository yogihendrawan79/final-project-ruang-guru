package ujian

// struct input ujian
type InputUjian struct {
	IdMataPelajaran int    `json:"id_mata_pelajaran" binding:"required"`
	KKM             int    `json:"kkm" binding:"required"`
	Deadline        string `json:"deadline" binding:"required"`
	Durasi          string `json:"durasi" binding:"required"` 
}
