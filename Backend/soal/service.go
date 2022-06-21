package soal

import (
	"errors"
)

// kontrak interface
type Service interface {
	CreateSoal(inputSoal InputSoal, userID int) error
	ShowAllSoalSiswa(mapelID int) ([]SoalSiswa, error)
}

// struct service
type service struct {
	repository Repository
}

// function NewService
func NewService(repository Repository) *service {
	return &service{repository}
}

// func create soal
func (s *service) CreateSoal(inputSoal InputSoal, userID int) error {
	// panggil function save soal
	err := s.repository.Save(inputSoal, userID)
	if err != nil {
		return errors.New("gagal menyimpan soal")
	}

	return nil
}

// func show all soal untuk siswa
func (s *service) ShowAllSoalSiswa(mapelID int) ([]SoalSiswa, error) {
	// panggil function GetAllSoalSiswa
	soal, err := s.repository.GetAllSoalSiswa(mapelID)
	if err != nil {
		return soal, errors.New("gagal mengambil soal")
	}

	return soal, nil
}
