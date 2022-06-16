package handler

import (
	"net/http"
	"strconv"
	"time"

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

	// format user
	data := user.FormatUser(newUser)

	// template respons
	respons := helper.ResponsAPI("Sukses Login", "Sukses!", http.StatusOK, data)

	// ketika berhasil login bikinkan token dan simpan ke cookie
	token, err := h.auth.GenerateToken(data.Id_users)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		// template respons
		respons := helper.ResponsAPI("Gagal membut token", "Gagal!", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, respons)
		return
	}

	// simpan token ke cookie
	cookie := &http.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HttpOnly: true,
	}

	// simpan cookie
	http.SetCookie(c.Writer, cookie)

	// return respons
	c.JSON(http.StatusOK, respons)

}

func (h *handlerUser) HomeSiswa(c *gin.Context) {

	// ambil context
	ctx := c.MustGet("current_user").(string)
	id_user, _ := strconv.Atoi(ctx)

	// cek role
	role, err := h.service.RoleUserById(id_user)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		// template respons
		respons := helper.ResponsAPI("Gagal mengambil role", "Gagal!", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, respons)
		return
	}

	if role != "siswa" {
		myErr := gin.H{
			"error": "Anda Bukan Siswa",
		}
		// template respons
		respons := helper.ResponsAPI("Akses ditolak", "Gagal!", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, respons)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Hallo, Welcome home",
		"id":      id_user,
	})
}

func (h *handlerUser) HomeGuru(c *gin.Context) {

	// ambil context
	ctx := c.MustGet("current_user").(string)
	id_user, _ := strconv.Atoi(ctx)

	// cek role
	role, err := h.service.RoleUserById(id_user)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		// template respons
		respons := helper.ResponsAPI("Gagal mengambil role", "Gagal!", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, respons)
		return
	}

	if role != "guru" {
		myErr := gin.H{
			"error": "Anda Bukan Guru",
		}
		// template respons
		respons := helper.ResponsAPI("Akses ditolak", "Gagal!", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, respons)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Hallo, Welcome home",
		"id":      id_user,
	})
}

// function buat handler logout
func (h *handlerUser) LogoutUser(c *gin.Context) {
	// untuk melakukan logout harus login terlebih dahulu
	c.MustGet("current_user")
	cookie := h.service.LogoutUser()

	// simpan cookie
	http.SetCookie(c.Writer, cookie)

	// template respons
	repons := helper.ResponsAPI("Sukses Logout", "Sukses!", http.StatusOK, nil)
	c.JSON(http.StatusOK, repons)

}
