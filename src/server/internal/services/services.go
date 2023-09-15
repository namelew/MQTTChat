package services

import (
	"log"

	"github.com/namelew/MQTTChat/src/server/internal/models"
	"github.com/namelew/MQTTChat/src/server/packages/databases"
)

func Start() {
	err := databases.MainDatabase.AutoMigrate(
		&models.User{},
		&models.Conversation{},
		&models.Message{},
		&models.UnreadMessage{},
	)

	if err != nil {
		log.Fatal("Unable to migrate databases tables. ", err.Error())
	}
}
