package messaging

import (
	"log"
	"os"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/namelew/MQTTChat/src/server/internal/models"
)

type Client struct {
	models.User
	MQTTClient mqtt.Client
}

func New(user models.User) *Client {
	mqtt.ERROR = log.New(os.Stdout, "[ERROR] ", 0)
	mqtt.CRITICAL = log.New(os.Stdout, "[CRIT] ", 0)

	options := mqtt.NewClientOptions().
		SetClientID(user.ID).
		AddBroker(os.Getenv("BROKERADRR")).
		SetAutoReconnect(true).
		SetOrderMatters(true).
		SetCleanSession(false)

	client := mqtt.NewClient(options)

	token := client.Connect()

	<-token.Done()

	if token.Error() != nil {
		log.Println(token.Error().Error())
		return nil
	}

	return &Client{
		User:       user,
		MQTTClient: client,
	}
}

func (c *Client) Free() {
	c.MQTTClient.Disconnect(DISCONNECTION_TIMEOUT)
}
