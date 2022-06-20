package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/helper"
	"github.com/rg-km/final-project-engineering-46/soal"
)

// struct handlerSoal
type handlerSoal struct {
	service soal.Service
}

// function NewHandlerSoal
func NewHandlerSoal(service soal.Service) *handlerSoal {
	return &handlerSoal{service}
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
	err = h.service.CreateSoal(inputSoal, user.Id_users)
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
