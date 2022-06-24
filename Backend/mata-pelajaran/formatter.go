package matapelajaran

// struct format mata pelajaran
type FormatMataPelajaran struct {
	IdMataPelajaran int    `json:"id_mata_pelajaran"`
	MataPelajaran   string `json:"mata_pelajaran"`
}

// function untuk format slice mata pelajaran
func FormaterMataPelajaran(mapel MataPelajaran) FormatMataPelajaran {
	// inisiasi
	mataPelajaran := FormatMataPelajaran{}

	// assign
	mataPelajaran.IdMataPelajaran = mapel.IdMataPelajaran
	mataPelajaran.MataPelajaran = mapel.MataPelajaran

	// return
	return mataPelajaran
}

// function untuk format slice mata pelajaran
func FormaterMataPelajarans(mapels []MataPelajaran) []FormatMataPelajaran {
	// inisiasi
	mataPelajarans := []FormatMataPelajaran{}

	// looping
	for _, mataPelajaran := range mapels {
		formatMataPelajaran := FormaterMataPelajaran(mataPelajaran)
		mataPelajarans = append(mataPelajarans, formatMataPelajaran)
	}

	// return
	return mataPelajarans
}
