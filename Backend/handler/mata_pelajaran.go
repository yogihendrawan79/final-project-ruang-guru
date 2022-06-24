package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/helper"
	matapelajaran "github.com/rg-km/final-project-engineering-46/mata-pelajaran"
	"github.com/rg-km/final-project-engineering-46/user"
)

//struck handler Mata Plejaran
type handlerMataPelajaran struct {
	matapelajaran matapelajaran.Service
	serviceUser   user.Service
}

// function NewHandlerSoal
func NewHandlerMataPelajaran(matapelajaran matapelajaran.Service, serviceUser user.Service) *handlerMataPelajaran {
	return &handlerMataPelajaran{matapelajaran, serviceUser}
}

// handler show mapel
func (h *handlerMataPelajaran) ShowMapels(c *gin.Context) {
	// authorization
	currentUser := helper.IsGuru(c)
	if currentUser.Role != "guru" {
		return
	}

	// kirim data user ke FE
	userData, err := h.serviceUser.UserById(currentUser.Id_users)
	if err != nil {
		myErr := gin.H{
			"error": err.Error(),
		}
		reponse := helper.ResponsAPI("gagal mengambil data user", "gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, reponse)
		return
	}

	// panggil function show dari service matapelajaran
	mapels, err := h.matapelajaran.GetAllMapel()
	if err != nil {
		data := gin.H{
			"error": err.Error(),
		}
		response := helper.ResponsAPI("gagal mengambil mata pelajaran", "gagal", http.StatusInternalServerError, data)
		c.JSON(http.StatusInternalServerError, response)
		return
	}

	// foramtter
	userProfile := user.FormatUser(userData)
	mapelDetail := matapelajaran.FormaterMataPelajarans(mapels)
	data := gin.H{
		"user_profile": userProfile,
		"mapel_detail": mapelDetail,
	}

	// response
	response := helper.ResponsAPI("berhasil mengambil mata pelajaran", "sukses", http.StatusOK, data)
	c.JSON(http.StatusOK, response)

}
