package ujian

import (
	"errors"

	"github.com/google/uuid"
)

// kontrak function
type Service interface {
	CreateUjian(input InputUjian, tokenSoal uuid.UUID) error
}

// struct dependen ke repo
type service struct {
	repository Repository
}

// func newservice
func NewService(repository Repository) *service {
	return &service{repository}
}

// implementasi kontrak
func (s *service) CreateUjian(input InputUjian, tokenSoal uuid.UUID) error {
	// panggil function update table mata pelajaran
	err := s.repository.Update(input, tokenSoal)
	if err != nil {
		return errors.New("gagal membuat sesi ujian")
	}
	return nil
}
