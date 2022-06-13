package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/Backend/helper"
	"github.com/rg-km/final-project-engineering-46/Backend/user"
)

// bikin struct
type handlerUser struct {
	service user.Service
}

// function untuk newHandler
func NewHandler(service user.Service) *handlerUser {
	return &handlerUser{service}
}

// function buat handler login
func (h *handlerUser) LoginUser(c *gin.Context) {
	// inisiasi input login siswa
	var input user.InputLogin

	// binding inputan
	err := c.ShouldBindJSON(&input)
	if err != nil {
		// ambil error binding
		myErr := helper.ErrorBinding(err)

		// respons API
		respons := helper.ResponsAPI("Gagal binding", "Gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, respons)
		return
	}

	// panggil function login diservice
	newUser, err := h.service.LoginUser(input)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		// template respons
		respons := helper.ResponsAPI("Login Gagal", "Gagal!", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, respons)
		return
	}

	// format siswa
	data := user.FormatUser(newUser)

	// template respons
	respons := helper.ResponsAPI("Sukses Login", "Sukses!", http.StatusOK, data)

	c.JSON(http.StatusOK, respons)

}
