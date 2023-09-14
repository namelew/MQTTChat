package databases

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	MainDatabase *gorm.DB
	BLOBStorage  *mongo.Client
	err          error
)

func Connect() {
	connectionString := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",
		os.Getenv("DBADRESS"),
		os.Getenv("DBUSER"),
		os.Getenv("DBPASSWORD"),
		os.Getenv("DBNAME"),
		os.Getenv("DBPORT"),
	)

	MainDatabase, err = gorm.Open(postgres.Open(connectionString), &gorm.Config{})

	if err != nil {
		log.Fatalln("Unable to connect with database. ", err.Error())
	}

	blobOptions := options.Client().ApplyURI(os.Getenv("BLOBURL"))

	BLOBStorage, err = mongo.Connect(context.TODO(), blobOptions)

	if err != nil {
		log.Fatalln("Unable to connect with blob storage. ", err.Error())
	}
}
