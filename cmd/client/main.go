package main

import (
	"github.com/namelew/mqttchat/internal/database"
	"github.com/namelew/mqttchat/internal/routes"
)

func main() {
	database.Connect()
	routes.Route()
}
