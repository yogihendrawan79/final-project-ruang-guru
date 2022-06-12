package main

import (
	"log"

	"github.com/rg-km/final-project-engineering-46/Backend/database/connection"
)

func main() {
	// bikin koneksi ke database dan migrasi database
	_, err := connection.ConnectionToDB()
	if err != nil {
		log.Fatalf("error: %v", err)
	}

	log.Println("SUKSES")
}
