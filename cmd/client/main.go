package main

import (
	"flag"
	"log"

	"github.com/joho/godotenv"
	"github.com/namelew/mqttchat/internal/database"
	"github.com/namelew/mqttchat/internal/routes"
)

const ENVFILE = "./.env"

func main() {
	var (
		loadDotEnv = flag.Bool("load-dot-envfile", false, "Load env vars from file")
	)

	flag.Parse()

	if *loadDotEnv {
		err := godotenv.Load(ENVFILE)

		if err != nil {
			log.Println("Unable to load env variables from file. ", err.Error())
		}
	}

	database.Connect()
	routes.Route()
}
