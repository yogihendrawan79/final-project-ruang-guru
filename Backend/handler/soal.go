package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/helper"
	"github.com/rg-km/final-project-engineering-46/soal"
	tokensoal "github.com/rg-km/final-project-engineering-46/token-soal"
)

// struct handlerSoal
type handlerSoal struct {
	soal      soal.Service
	tokenSoal tokensoal.Service
}

// function NewHandlerSoal
func NewHandlerSoal(soal soal.Service, tokenSoal tokensoal.Service) *handlerSoal {
	return &handlerSoal{soal, tokenSoal}
}

// function buat handler create soal
func (h *handlerSoal) CreateSoal(c *gin.Context) {

	// authorization
	user := helper.IsGuru(c)

	// inisiasi input soal
	var inputSoal soal.InputSoal

	// binding
	err := c.ShouldBindJSON(&inputSoal)
	if err != nil {
		// ambil error binding
		myErr := helper.ErrorBinding(err)
		response := helper.ResponsAPI("Gagal binding", "Gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, response)
		return

	}

	// panggil function create soal
	err = h.soal.CreateSoal(inputSoal, user.Id_users)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		response := helper.ResponsAPI("Gagal membuat soal", "Gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	// response sukses
	message := gin.H{
		"message": "Berhasil membuat soal",
	}

	response := helper.ResponsAPI("Berhasil membuat soal", "Berhasil", http.StatusOK, message)
	c.JSON(http.StatusOK, response)

}

// function handler untuk menampilkan semua soal ketika token valid
func (h *handlerSoal) ShowAllSoalSiswa(c *gin.Context) {
	// authorization
	user := helper.IsSiswa(c)

	// inisiasi input token
	var input soal.InputTokenSiswa

	// binding
	err := c.ShouldBindJSON(&input)
	if err != nil {
		myErr := helper.ErrorBinding(err)
		response := helper.ResponsAPI("Gagal binding", "gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	// validasi token
	mapel, err := h.tokenSoal.ValidasiTokenSoal(user.Id_users, input.Token)
	if err != nil {
		data := gin.H{
			"error": err.Error(),
		}
		response := helper.ResponsAPI("Gagal validasi token", "gagal", http.StatusBadRequest, data)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	// tampilkan semua soal
	soals, err := h.soal.ShowAllSoalSiswa(mapel.IdMataPelajaran)
	if err != nil {
		data := gin.H{
			"error": err.Error(),
		}
		response := helper.ResponsAPI("Gagal mengambil soal", "gagal", http.StatusBadRequest, data)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	data := gin.H{
		"mapel":  mapel.MataPelajaran,
		"durasi": mapel.Durasi,
		"soal":   soals,
	}

	response := helper.ResponsAPI("Sukses mengambil soal", "sukses", http.StatusOK, data)
	c.JSON(http.StatusOK, response)
}
