package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/helper"
	"github.com/rg-km/final-project-engineering-46/soal"
	"github.com/rg-km/final-project-engineering-46/user"
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

	// ambil context dan ubah tipe ke User
	user := c.MustGet("currentUser").(user.User)

	// ambil role
	if user.Role != "guru" {
		MyErr := gin.H{
			"error": "role not valid",
		}
		response := helper.ResponsAPI("Akses ditolak", "Forbidden", http.StatusForbidden, MyErr)
		c.JSON(http.StatusForbidden, response)
		return
	}

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
	err = h.service.CreateSoal(inputSoal)
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
