package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/helper"
	matapelajaran "github.com/rg-km/final-project-engineering-46/mata-pelajaran"
	tokensoal "github.com/rg-km/final-project-engineering-46/token-soal"
	"github.com/rg-km/final-project-engineering-46/ujian"
)

// bikin struct dengan dependensi ke service token-soal
type handlerUjian struct {
	tokenSoal     tokensoal.Service
	ujian         ujian.Service
	mataPelajaran matapelajaran.Repository
}

// func newhandler
func NewHandlerUjian(tokenSoal tokensoal.Service, ujian ujian.Service, mataPelajaran matapelajaran.Repository) *handlerUjian {
	return &handlerUjian{tokenSoal, ujian, mataPelajaran}
}

// handler create ujian
func (h *handlerUjian) CreateUjian(c *gin.Context) {
	// authorization
	user := helper.IsGuru(c)
	if user.Role != "guru" {
		return
	}

	// deklarasi input ujian
	var input ujian.InputUjian

	// binding
	err := c.ShouldBindJSON(&input)
	if err != nil {
		myErr := helper.ErrorBinding(err)
		reponse := helper.ResponsAPI("Gagal binding", "gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, reponse)
		return
	}

	// generate token soal
	token, err := h.tokenSoal.GenerateTokenSoal(input.IdMataPelajaran)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		reponse := helper.ResponsAPI("Gagal generate token", "gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, reponse)
		return
	}

	// update table mata_pelajaran
	err = h.ujian.CreateUjian(input, token)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		reponse := helper.ResponsAPI("Gagal membuat ujian", "gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, reponse)
		return
	}

	// sukses
	data := gin.H{
		"token_ujian": token,
	}

	reponse := helper.ResponsAPI("Ujian berhasil dibuat", "sukses", http.StatusOK, data)
	c.JSON(http.StatusOK, reponse)
}

// handler untuk finish ujian
func (h *handlerUjian) FinishUjian(c *gin.Context) {
	// authorization
	currentUser := helper.IsSiswa(c)
	if currentUser.Role != "siswa" {
		return
	}

	// inisiasi input
	var input ujian.InputFinishUjian

	// binding
	err := c.ShouldBindJSON(&input)
	if err != nil {
		myErr := helper.ErrorBinding(err)
		response := helper.ResponsAPI("gagal memproses jawaban", "gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	// panggil service
	_, _, err = h.ujian.FinishUjian(input, currentUser.Id_users)
	if err != nil {
		data := gin.H{
			"error": err.Error(),
		}
		response := helper.ResponsAPI("gagal memproses jawaban", "gagal", http.StatusBadRequest, data)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	data := gin.H{
		// "nilai":  nilai,
		// "status": status,
		"message": "berhasil submit jawaban",
	}
	response := helper.ResponsAPI("jawaban berhasil diproses", "sukses", http.StatusOK, data)
	c.JSON(http.StatusOK, response)

}

// handler kill ujian
func (h *handlerUjian) KillUjian(c *gin.Context) {
	// authorization
	user := helper.IsGuru(c)
	if user.Role != "guru" {
		return
	}

	// panggil service
	err := h.ujian.KillUjian()
	if err != nil {
		data := gin.H{
			"error": err.Error(),
		}
		response := helper.ResponsAPI("gagal kill ujian", "gagal", http.StatusInternalServerError, data)
		c.JSON(http.StatusInternalServerError, response)
		return
	}

	data := gin.H{
		"message": "berhasil kill ujian",
	}
	response := helper.ResponsAPI("berhasil kill ujian", "sukses", http.StatusOK, data)
	c.JSON(http.StatusOK, response)

}

func (h *handlerUjian) ShowNilaiUjian(c *gin.Context) {
	// authorization
	currentUser := helper.IsSiswa(c)
	if currentUser.Role != "siswa" {
		return
	}

	// inisiasi input
	var input ujian.InputFinishUjian

	// binding
	err := c.ShouldBindJSON(&input)
	if err != nil {
		myErr := helper.ErrorBinding(err)
		response := helper.ResponsAPI("gagal memproses jawaban", "gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	// panggil service
	nilai, status, err := h.ujian.FinishUjian(input, currentUser.Id_users)
	if err != nil {
		data := gin.H{
			"error": err.Error(),
		}
		response := helper.ResponsAPI("gagal memproses nilai", "gagal", http.StatusBadRequest, data)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	// ambil mata pelajaran
	mapel, err := h.mataPelajaran.ShowMapelByIdMapel(input.IdMataPelajaran)
	if err != nil {
		data := gin.H{
			"error": err.Error(),
		}
		response := helper.ResponsAPI("gagal mengambil mata pelajaran", "gagal", http.StatusBadRequest, data)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	data := gin.H{
		"nilai":          nilai,
		"status":         status,
		"mata_pelajaran": mapel.MataPelajaran,
	}

	response := helper.ResponsAPI("jawaban berhasil diproses", "sukses", http.StatusOK, data)
	c.JSON(http.StatusOK, response)
}
