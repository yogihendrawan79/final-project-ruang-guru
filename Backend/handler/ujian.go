package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/helper"
	tokensoal "github.com/rg-km/final-project-engineering-46/token-soal"
	"github.com/rg-km/final-project-engineering-46/ujian"
)

// bikin struct dengan dependensi ke service token-soal
type handlerUjian struct {
	tokenSoal tokensoal.Service
	ujian     ujian.Service
}

// func newhandler
func NewHandlerUjian(tokenSoal tokensoal.Service, ujian ujian.Service) *handlerUjian {
	return &handlerUjian{tokenSoal, ujian}
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
