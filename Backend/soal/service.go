package soal

import "errors"

// kontrak interface
type Service interface {
	CreateSoal(inputSoal InputSoal, userID int) error
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
