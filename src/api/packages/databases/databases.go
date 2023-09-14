package databases

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/redis/go-redis/v9"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	MainDatabase *gorm.DB
	BLOBStorage  *mongo.Client
	DBCache      *redis.Client
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

	blobOptions := options.Client().ApplyURI(os.Getenv("BLOBCONN"))

	BLOBStorage, err = mongo.Connect(context.TODO(), blobOptions)

	if err != nil {
		log.Fatalln("Unable to connect with blob storage. ", err.Error())
	}

	cacheOptions, err := redis.ParseURL(os.Getenv("CACHECONN"))

	if err != nil {
		log.Fatalln("Unable to parser db cache connection string. ", err.Error())
	}

	DBCache = redis.NewClient(cacheOptions)
}
