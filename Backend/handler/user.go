package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/auth"
	"github.com/rg-km/final-project-engineering-46/helper"
	"github.com/rg-km/final-project-engineering-46/user"
)

// bikin struct
type handlerUser struct {
	service user.Service
	auth    auth.Service
}

// function untuk newHandler
func NewHandler(service user.Service, auth auth.Service) *handlerUser {
	return &handlerUser{service, auth}
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

	// ketika berhasil login bikinkan token dan simpan ke cookie
	token, err := h.auth.GenerateToken(newUser.Id_users)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		// template respons
		respons := helper.ResponsAPI("Gagal membut token", "Gagal!", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, respons)
		return
	}

	// masukan token jwt sebagai response login
	data := user.ResponsLogin(token)

	// template respons api
	respons := helper.ResponsAPI("Sukses Login", "Sukses!", http.StatusOK, data)

	// return respons
	c.JSON(http.StatusOK, respons)

}

// function percobaan untuk test middleware
func (h *handlerUser) HomeSiswa(c *gin.Context) {
	// ambil context dan ubah tipe ke User
	user := c.MustGet("currentUser").(user.User)

	// ambil role
	if user.Role != "siswa" {
		MyErr := gin.H{
			"error": "Anda bukan siswa",
		}
		response := helper.ResponsAPI("Akses ditolak", "Forbidden", http.StatusForbidden, MyErr)
		c.JSON(http.StatusForbidden, response)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Hallo, Welcome home",
		"role":    user.Role,
	})
}

func (h *handlerUser) HomeGuru(c *gin.Context) {

	// ambil context dan ubah tipe ke User
	user := c.MustGet("currentUser").(user.User)

	// ambil role
	if user.Role != "guru" {
		MyErr := gin.H{
			"error": "Anda bukan guru",
		}
		response := helper.ResponsAPI("Akses ditolak", "Forbidden", http.StatusForbidden, MyErr)
		c.JSON(http.StatusForbidden, response)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Hallo, Welcome home",
		"role":    user.Role,
	})
}

// function buat handler logout
func (h *handlerUser) LogoutUser(c *gin.Context) {
	// untuk melakukan logout harus login terlebih dahulu
	c.MustGet("currentUser")
	cookie := h.service.LogoutUser()

	// simpan cookie
	http.SetCookie(c.Writer, cookie)

	// template respons
	repons := helper.ResponsAPI("Sukses Logout", "Sukses!", http.StatusOK, nil)
	c.JSON(http.StatusOK, repons)

}
