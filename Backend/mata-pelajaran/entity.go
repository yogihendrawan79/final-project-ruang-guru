package matapelajaran

import (
	"github.com/google/uuid"
)

// entity
type MataPelajaran struct {
	IdMataPelajaran int
	MataPelajaran   string
	Token           uuid.UUID
	KKM             int
	Durasi          string
	Deadline        string
}
