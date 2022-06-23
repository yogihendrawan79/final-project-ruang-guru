package helper

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/rg-km/final-project-engineering-46/user"
)

// bikin struct untuk template
type template struct {
	Meta meta        `json:"meta"`
	Data interface{} `json:"data"`
}

// bikin meta
type meta struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
	Status  string `json:"status"`
}

// function respons api
func ResponsAPI(message, status string, code int, data interface{}) template {
	myMeta := meta{
		Message: message,
		Code:    code,
		Status:  status,
	}

	return template{
		Meta: myMeta,
		Data: data,
	}
}

// function error binding format
func ErrorBinding(err error) []string {
	var myErr []string
	for _, e := range err.(validator.ValidationErrors) {
		errorMessage := fmt.Sprintf("error on filed: %s, condition: %s", e.Field(), e.ActualTag())
		myErr = append(myErr, errorMessage)
	}

	return myErr
}

// get role guru
func IsGuru(c *gin.Context) user.User {
	// ambil context dan ubah tipe ke User
	user := c.MustGet("currentUser").(user.User)

	// ambil role
	if user.Role != "guru" {
		MyErr := gin.H{
			"error": "role not valid",
		}
		response := ResponsAPI("Akses ditolak", "Forbidden", http.StatusForbidden, MyErr)
		c.JSON(http.StatusForbidden, response)
		return user
	}

	return user
}

// get role siswa
func IsSiswa(c *gin.Context) user.User {
	// ambil context dan ubah tipe ke User
	user := c.MustGet("currentUser").(user.User)

	// ambil role
	if user.Role != "siswa" {
		MyErr := gin.H{
			"error": "role not valid",
		}
		response := ResponsAPI("Akses ditolak", "Forbidden", http.StatusForbidden, MyErr)
		c.JSON(http.StatusForbidden, response)
		return user
	}

	return user
}

// function ubah string ke time.Time
func ConvetToTime(deadline string) (time.Time, error) {
	layout := "2006-01-02 15:04:05"

	date, err := time.Parse(layout, deadline)
	if err != nil {
		return date, err
	}

	return date, nil
}
