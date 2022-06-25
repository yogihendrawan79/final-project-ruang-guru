package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-46/helper"
	"github.com/rg-km/final-project-engineering-46/report"
)

//struck handler Mata Plejaran
type HandlerReport struct {
	report report.Service
}

// function NewHandlerSoal
func NewHandlerReport(report report.Service) *HandlerReport {
	return &HandlerReport{report}
}

// handler show mapel
func (h *HandlerReport) ShowReport(c *gin.Context) {
	//authorization
	currentUser := helper.IsGuru(c)
	if currentUser.Role != "guru" {
		return
	}

	// inisiasi input
	var input report.InputReport

	// binding
	err := c.ShouldBindJSON(&input)
	if err != nil {
		myErr := helper.ErrorBinding(err)
		response := helper.ResponsAPI("gagal binding", "gagal", http.StatusBadRequest, myErr)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	// panggil service
	report, err := h.report.ShowReport(input)
	if err != nil {
		data := gin.H{
			"error": err.Error(),
		}
		response := helper.ResponsAPI("gagal mengambil report", "gagal", http.StatusBadRequest, data)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	// cek apakah ada report atau tidak
	if len(report) == 0 {
		data := gin.H{
			"error": "id mata pelajaran tidak ditemukana",
		}
		response := helper.ResponsAPI("gagal mengambil report", "gagal", http.StatusBadRequest, data)
		c.JSON(http.StatusBadRequest, response)
		return
	}

	// return
	response := helper.ResponsAPI("berhasil mengambil report", "sukses", http.StatusOK, report)
	c.JSON(http.StatusOK, response)

}
