package messages

import (
	"time"

	"github.com/namelew/MQTTChat/src/server/internal/models"
)

type MessageType uint8

const (
	Error     MessageType = 0
	Login     MessageType = 1
	Logout    MessageType = 2
	Chat      MessageType = 3
	Success   MessageType = 4
	Heartbeat MessageType = 5
)

type User struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type Conversation struct {
	Id           string                  `json:"id"`
	Name         string                  `json:"name"`
	Type         models.ConversationType `json:"type"`
	Participants []User                  `json:"participants"`
	Messages     []Message               `json:"messages"`
}

type Message struct {
	Id        uint64       `json:"id"`
	Type      MessageType  `json:"type"`
	Sender    User         `json:"sender"`
	Chat      Conversation `json:"chat"`
	Timestamp time.Time    `json:"timestamp"`
	Payload   string       `json:"payload"`
}
