package messaging

import (
	"encoding/json"
	"log"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/namelew/MQTTChat/src/server/internal/models"
	"github.com/namelew/MQTTChat/src/server/packages/databases"
)

func OnMessageArrive(client mqtt.Client, message mqtt.Message) {
	var chatMessage models.Message

	err := json.Unmarshal(message.Payload(), &chatMessage)

	if err != nil {
		log.Println("Callback Error: Unable to unmarshall received message")
		return
	}

	trans := databases.MainDatabase.Save(&models.UnreadMessage{
		MessageID: chatMessage.ID,
		To:        chatMessage.ToID,
		Time:      chatMessage.Time,
	})

	if trans.Error != nil {
		log.Println("Callback Error: Unable save message on the unread list")
		return
	}
}
