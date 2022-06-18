package matapelajaran

import (
	"errors"

	"github.com/google/uuid"
)

// bikin kontrak
type Service interface {
	ValidasiTokenSoal(input uuid.UUID) (string, error)
	// GenerateTokenSoal() (uuid.UUID, error)
}

// bikin struct
type service struct {
	repository Repository
}

// bikin function untuk new service
func NewSerivce(repository Repository) *service {
	return &service{repository}
}

// bikin function untuk generate token soal
// bikin function untuk validasi token soal
func (s *service) ValidasiTokenSoal(input string) (uuid.UUID, error) {

	// panggil function get token soal
	mapel, err := s.repository.GetTokenSoal(input)
	if err != nil {
		return mapel.Token, err
	}

	// kalau token tidak sama
	if mapel.Token.String() != input {
		return mapel.Token, errors.New("token tidak valid")
	}

	// sukses
	return mapel.Token, nil
}
