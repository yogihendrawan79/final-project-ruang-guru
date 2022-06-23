package matapelajaran

import "errors"

// bikin kontrak GetAllMapel ([]matapelajrab,error)
type Service interface {
	GetAllMapel() ([]MataPelajaran, error)
}

// bikin struct dependen repo
type service struct {
	repository Repository
}

// bikin newservice
func NewService(repository Repository) *service {
	return &service{repository}
}

// implement kontrak ke struct
func (s *service) GetAllMapel() ([]MataPelajaran, error) {
	// panggil func showall di repo
	mapels, err := s.repository.ShowAllMapel()
	// error handling
	if err != nil {
		return mapels, errors.New("mata pelajaran tidak ditemukan")
	}
	// return
	return mapels, nil
}
