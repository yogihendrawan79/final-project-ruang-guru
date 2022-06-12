package connection

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func ConnectionToDB() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "../../../Backend/database/exam_time.db")
	if err != nil {
		return db, err
	}

	return db, nil
}
