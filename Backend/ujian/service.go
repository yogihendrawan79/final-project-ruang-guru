package ujian

import (
	"errors"
	"log"

	"github.com/google/uuid"
	matapelajaran "github.com/rg-km/final-project-engineering-46/mata-pelajaran"
	"github.com/rg-km/final-project-engineering-46/soal"
	tokensoal "github.com/rg-km/final-project-engineering-46/token-soal"
)

// kontrak function
type Service interface {
	CreateUjian(input InputUjian, tokenSoal uuid.UUID) error
	FinishUjian(input InputFinishUjian, userID int) (int, string, error)
	KillUjian() error
}

// struct dependen ke repo
type service struct {
	repository    Repository
	repoSoal      soal.Repository
	repoMapel     matapelajaran.Repository
	repoTokenSoal tokensoal.Repository
}

// func newservice
func NewService(repository Repository, repoSoal soal.Repository, repoMapel matapelajaran.Repository, repoTokenSoal tokensoal.Repository) *service {
	return &service{repository, repoSoal, repoMapel, repoTokenSoal}
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

func (s *service) FinishUjian(input InputFinishUjian, userID int) (int, string, error) {
	// rules : 1 benar = 2point, > kkm status = lulus
	benar := 0
	score := 0
	var status string

	// save jawaban siswa ke db
	for _, jawaban := range input.Jawabans {
		go func(jawaban Jawaban) {
			err := s.repository.SaveAnswer(jawaban, userID)
			if err != nil {
				log.Println(err)
			}
		}(jawaban)

		// err := s.repository.SaveAnswer(jawaban, userID)
		// if err != nil {
		// 	log.Println(err)
		// }

		// get kunci jawaban
		soals, err := s.repoSoal.GetAllSoalGuru(input.IdMataPelajaran)
		if err != nil {
			return score, status, errors.New("gagal mengambil soal")
		}

		// loop soal
		for _, soal := range soals {
			if soal.IdSoal == jawaban.IdSoal {
				if jawaban.Answer == soal.KunciJawaban {
					benar++
				}
			}
		}

	}

	// hitung nilai
	score = benar * 10

	// input
	data := InputScore{
		IdMataPelajaran: input.IdMataPelajaran,
		Nilai:           score,
	}

	// ambil kkm
	mapel, err := s.repoMapel.ShowMapelByIdMapel(input.IdMataPelajaran)
	if err != nil {
		return score, status, errors.New("gagal mengambil kkm")
	}

	// bandingin kkm dan score
	if score > mapel.KKM {
		status = "Lulus"
	} else {
		status = "Tidak Lulus"
	}

	// save score
	idScore := s.repository.SaveScore(data, userID)
	if err != nil {
		return score, status, errors.New("gagal input nilai")
	}

	// save report
	err = s.repository.SaveReport(userID, input.IdMataPelajaran, idScore, status)
	if err != nil {
		return score, status, errors.New("gagal input report")
	}

	// update status used pada token set jadi true
	err = s.repoTokenSoal.UpdateIsUsed(userID, input.IdMataPelajaran)
	if err != nil {
		return score, status, errors.New("gagal update status isUsed token ujian")
	}

	return score, status, nil
}

// service kill ujian
// function untuk mengakhiri kegiatan ujian (misal kegiatan ujian selama 1 minggu sudah selesai, ini akan mentruncate table users_mapel) dengan tujuan di next ujian atribut used di table users_mapel kembali default menjadi false agar token lolos validasi
func (s *service) KillUjian() error {
	// panggil repo
	err := s.repository.KillUjian()
	if err != nil {
		log.Println(err)
		return errors.New("gagal kill ujian")
	}

	// return
	return nil
}
