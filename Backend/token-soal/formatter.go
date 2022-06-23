package tokensoal

import matapelajaran "github.com/rg-km/final-project-engineering-46/mata-pelajaran"

// struct resopnse untuk token valid
type ResponseTokenValid struct {
	TokenUjian      string `json:"token_ujian"`
	IDMataPelajaran int    `json:"id_mata_pelajaran"`
}

func TokenValidFormatter(mapel matapelajaran.MataPelajaran) ResponseTokenValid {
	var respons ResponseTokenValid

	respons.IDMataPelajaran = mapel.IdMataPelajaran
	respons.TokenUjian = mapel.Token.String()

	return respons
}
