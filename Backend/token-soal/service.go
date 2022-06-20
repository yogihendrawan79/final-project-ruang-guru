package tokensoal

import (
	"errors"

	"github.com/google/uuid"
)

// bikin kontrak
type Service interface {
	GenerateTokenSoal(mapelID int) (uuid.UUID, error)
	ValidasiTokenSoal(userID, mapelID int, inputToken string) error
}

// bikin struct
type service struct {
	repository Repository
}

// bikin func newservice
func NewService(repository Repository) *service {
	return &service{repository}
}

// bikin function untuk generate token soal
func (s *service) GenerateTokenSoal(mapelID int) (uuid.UUID, error) {

	// generate token
	token, err := uuid.NewRandom()
	if err != nil {
		return token, errors.New("gagal membuat token")
	}

	// simpan token ke database
	newToken, err := s.repository.UpdateTokenSoal(token, mapelID)
	if err != nil {
		return newToken, errors.New("gagal menyimpan token")
	}

	return newToken, nil

}

// bikin function untuk validasi token soal
func (s *service) ValidasiTokenSoal(userID, mapelID int, inputToken string) error {
	// inisiasi waktu hari ini
	// now := time.Now()

	// cek apakah ada token di database
	_, err := s.repository.GetMapelByToken(inputToken)
	if err != nil {
		return errors.New("gagal mengambil token soal")
	}

	// cek apakah sudah lewat deadline atau belum
	// ini masih kosong

	// cek apakah token sudah digunakan atau belum
	isUsed, err := s.repository.IsUsed(userID, mapelID)
	if err != nil {
		return errors.New("gagal mengambil data used")
	}

	if isUsed == 1 {
		return errors.New("token kedaluarsa")
	}

	return nil
}
