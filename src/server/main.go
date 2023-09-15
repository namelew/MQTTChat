package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/namelew/MQTTChat/src/server/internal/services"
	"github.com/namelew/MQTTChat/src/server/packages/databases"
)

func main() {
	if os.Getenv("ENV") == "" || os.Getenv("ENV") == "DEV" {
		if err := godotenv.Load(".env"); err != nil {
			log.Panic(err.Error())
		}
	}
	databases.Connect()
	services.Start()
}
