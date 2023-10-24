package messages

import "time"

type ConversationType uint8
type MessageType uint8

const (
	OneToOne ConversationType = 0
	Group    ConversationType = 1
)

const (
	Error   MessageType = 0
	Login   MessageType = 1
	Logout  MessageType = 2
	Chat    MessageType = 3
	Success MessageType = 4
)

type User struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type Conversation struct {
	Id           string           `json:"id"`
	Name         string           `json:"name"`
	Type         ConversationType `json:"type"`
	Participants []User           `json:"participants"`
	Messages     []Message        `json:"messages"`
}

type Message struct {
	Id        uint64       `json:"id"`
	Type      MessageType  `json:"type"`
	Sender    User         `json:"sender"`
	Chat      Conversation `json:"chat"`
	Timestamp time.Time    `json:"timestamp"`
	Payload   string       `json:"payload"`
}
