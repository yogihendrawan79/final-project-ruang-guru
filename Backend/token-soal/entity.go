package tokensoal

import (
	"time"

	"github.com/google/uuid"
)

// struct model dari table mata_pelajaran
type MataPelajaran struct {
	IdMataPelajaran int
	MataPelajaran   string
	Token           uuid.UUID
	KKM             int
	Durasi          string
	Deadline        time.Time
}
