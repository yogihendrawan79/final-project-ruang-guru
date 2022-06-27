package report

import (
	"errors"
)

// kontrak function
type Service interface {
	ShowReport(input InputReport) ([]ResponseReport, error)
}

// struct embed ke repo
type service struct {
	repository Repository
}

// func newService
func NewService(repository Repository) *service {
	return &service{repository}
}

// implement kontrak
func (s *service) ShowReport(input InputReport) ([]ResponseReport, error) {
	// panggil repo
	report, err := s.repository.ShowReport(input)
	if err != nil {
		return report, errors.New("gagal mengambil report")
	}
	// return
	return report, nil
}
