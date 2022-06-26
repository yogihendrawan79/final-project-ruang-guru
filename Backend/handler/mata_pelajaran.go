package handler

import (
	"log"
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

	// panggil function show dari service matapelajaran
	mapels, err := h.matapelajaran.GetAllMapel()
	log.Println(err)
	log.Println(mapels)
	if err != nil {
		data := gin.H{
			"error": err.Error(),
		}
		response := helper.ResponsAPI("gagal mengambil mata pelajaran", "gagal", http.StatusInternalServerError, data)
		c.JSON(http.StatusInternalServerError, response)
		return
	}

	// formatter
	mapelDetail := matapelajaran.FormaterMataPelajarans(mapels)

	// response
	response := helper.ResponsAPI("berhasil mengambil mata pelajaran", "sukses", http.StatusOK, mapelDetail)
	c.JSON(http.StatusOK, response)

}
