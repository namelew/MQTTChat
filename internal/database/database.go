package database

import (
	"fmt"
	"log"
	"os"

	"github.com/namelew/mqttchat/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func Connect() {
	connectionString := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DBADRESS"),
		os.Getenv("DBUSER"),
		os.Getenv("DBPASSWORD"),
		os.Getenv("DBNAME"),
		os.Getenv("DBPORT"),
	)

	DB, err = gorm.Open(postgres.Open(connectionString))

	if err != nil {
		log.Panic("Erro ao conectar com o banco de dados: ", err.Error())
	}

	err = DB.AutoMigrate(
		&models.User{},
		&models.Chat{},
		&models.Message{},
	)

	if err != nil {
		log.Fatal("Erro ao migrar tabelas do banco de dados: " + err.Error())
	}
}
