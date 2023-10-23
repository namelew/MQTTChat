package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/namelew/MQTTChat/src/server/internal/routes"
	"github.com/namelew/MQTTChat/src/server/internal/services"
	"github.com/namelew/MQTTChat/src/server/packages/databases"
)

func main() {
	log.Println("Loanding Envorimment")

	if os.Getenv("ENV") == "" || os.Getenv("ENV") == "DEV" {
		if err := godotenv.Load(".env"); err != nil {
			log.Panic(err.Error())
		}
	}
	log.Println("Connecting to databases")

	databases.Connect()

	log.Println("Migrating tables")

	services.Start()

	log.Println("Read to accept connections")

	routes.HandleConnections()
}
