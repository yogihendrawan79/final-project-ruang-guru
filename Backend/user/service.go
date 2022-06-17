package user

import (
	"errors"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

// bikin kontrak Service
type Service interface {
	LoginUser(input InputLogin) (User, error)
	LogoutUser() *http.Cookie
	UserById(userID int) (User, error)
}

// bikin struct service untuk menampung repository
type service struct {
	repository Repository
}

// function NewService untuk membuat service dg params repository return pointer service
func NewService(repository Repository) *service {
	return &service{repository}
}

// bikin function milik service yg menerapkan kontrak Service
func (s *service) LoginUser(input InputLogin) (User, error) {
	// ambil email dan password
	email := input.Email
	password := input.Password

	// panggil function FindSiswaByEmail dari respository dan parsing email
	user, err := s.repository.FindUserByEmail(email)
	if err != nil {
		return user, errors.New("email tidak terdaftar")
	}

	// kalau email ditemukan, bandingkan password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return user, errors.New("password salah")
	}

	// return
	return user, nil
}

// function logout
func (s *service) LogoutUser() *http.Cookie {
	// ubah value pada cookie
	cookie := &http.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour * 1),
		HttpOnly: true,
	}

	return cookie
}

// function untuk mencari role user by id
func (s *service) UserById(userID int) (User, error) {
	// panggil function roleUserById dari respository
	user, err := s.repository.UserById(userID)
	if err != nil {
		return user, errors.New("id tidak ditemukan")
	}

	return user, nil
}
