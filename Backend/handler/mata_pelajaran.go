package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/helper"
	matapelajaran "github.com/rg-km/final-project-engineering-46/mata-pelajaran"
)

//struck handler Mata Plejaran
type handlerMataPelajaran struct {
	matapelajaran matapelajaran.Service
}

// function NewHandlerSoal
func NewHandlerMataPelajaran(matapelajaran matapelajaran.Service) *handlerMataPelajaran {
	return &handlerMataPelajaran{matapelajaran}
}

// handler show mapel
func (h *handlerMataPelajaran) ShowMapels(c *gin.Context) {
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
	data := matapelajaran.FormaterMataPelajarans(mapels)

	// response
	response := helper.ResponsAPI("berhasil mengambil mata pelajaran", "sukses", http.StatusOK, data)
	c.JSON(http.StatusOK, response)

}
