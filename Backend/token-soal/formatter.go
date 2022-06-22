package tokensoal

// struct resopnse untuk token valid
type ResponseTokenValid struct {
	TokenUjian      string `json:"token_ujian"`
	IDMataPelajaran int    `json:"id_mata_pelajaran"`
}

func TokenValidFormatter(mapel MataPelajaran) ResponseTokenValid {
	var respons ResponseTokenValid

	respons.IDMataPelajaran = mapel.IdMataPelajaran
	respons.TokenUjian = mapel.Token.String()

	return respons
}
