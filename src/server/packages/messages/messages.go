package messages

import "time"

type ConversationType uint8
type MessageType uint8

const (
	OneToOne ConversationType = 0
	Group    ConversationType = 1
)

const (
	Error    MessageType = 0
	Request  MessageType = 1
	Response MessageType = 2
	Chat     MessageType = 3
)

type User struct {
	Id   string
	Name string
}

type Conversation struct {
	Id           string
	Name         string
	Type         ConversationType
	Participants []User
	Messages     []Message
}

type Message struct {
	Id        uint64
	Type      MessageType
	Sender    User
	Timestamp time.Time
	Payload   string
}
