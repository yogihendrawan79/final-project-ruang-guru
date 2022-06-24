package auth

import (
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go/v4"
)

// bikin kontrak interface untuk function di auth
type Service interface {
	GenerateToken(id_user int) (string, error)
	ValidateToken(token string) (*jwt.Token, error)
}

// struct service
type service struct{}

// func NewServiceAuth
func NewServiceAuth() *service {
	return &service{}
}

// secret KEY
var MYKEY string = "fdjfbdhbfuwg786765jbj"

// function untuk generate token
func (s *service) GenerateToken(userID int) (string, error) {
	// bikin claims/payload
	exp := time.Now().Add(time.Hour * 24)
	id := strconv.Itoa(userID)
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer: id,
		ExpiresAt: &jwt.Time{
			Time: exp,
		},
	})

	// tandatangani claims
	token, err := claims.SignedString([]byte(MYKEY))
	if err != nil {
		return token, err
	}

	return token, nil
}

// function untuk memvalidasi token
func (s *service) ValidateToken(cookie string) (*jwt.Token, error) {
	// parsing cookie dan validasi token
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		// return secret key
		return []byte(MYKEY), nil
	})

	if err != nil {
		return nil, err
	}

	return token, nil
}
