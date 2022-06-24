package tokensoal

import (
	"errors"
	"time"

	"github.com/google/uuid"
	matapelajaran "github.com/rg-km/final-project-engineering-46/mata-pelajaran"
)

// bikin kontrak
type Service interface {
	GenerateTokenSoal(mapelID int) (uuid.UUID, error)
	ValidasiTokenSoal(userID int, inputToken string) (matapelajaran.MataPelajaran, error)
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
func (s *service) ValidasiTokenSoal(userID int, inputToken string) (matapelajaran.MataPelajaran, error) {
	// inisiasi waktu hari ini
	now := time.Now()

	// cek apakah ada token di database
	mapel, err := s.repository.GetMapelByToken(inputToken)
	if err != nil {
		return mapel, errors.New("token soal tidak valid")
	}

	// cek apakah sudah lewat deadline atau belum
	// apakah deadline itu sebelum hari ini? jika true berarti sudah lewat deadline
	deadline := mapel.Deadline
	r := deadline.Before(now)
	if r {
		return mapel, errors.New("token kedaluarsa")
	}

	// cek apakah token sudah digunakan atau belum
	isUsed, err := s.repository.IsUsed(userID, mapel.IdMataPelajaran)
	if err != nil {
		return mapel, errors.New("gagal mengambil data used")
	}

	if isUsed == 1 {
		return mapel, errors.New("token kedaluarsa")
	}

	return mapel, nil

}
