package handler

import (
	"net/http"

	"github.com/rg-km/final-project-engineering-46/helper"
	"github.com/rg-km/final-project-engineering-46/user"

	"github.com/gin-gonic/gin"
)

// strcut HandlerProfile
type handlerProfile struct{}

// func new Handler
func NewHandlerProfile() *handlerProfile {
	return &handlerProfile{}
}

// profile handler
func (h *handlerProfile) Profile(c *gin.Context) {
	// authorization
	currentUser := c.MustGet("currentUser").(user.User)

	// format data user
	data := user.FormatUser(currentUser)

	response := helper.ResponsAPI("berhasil mengambil data user", "sukses", http.StatusOK, data)
	c.JSON(http.StatusOK, response)

}
