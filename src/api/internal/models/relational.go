package models

import "time"

type ConversationType uint8

const (
	OneToOne  ConversationType = 0
	OneToMany ConversationType = 1
)

type User struct {
	ID             string
	Name           string
	LastConnection time.Time
}

type Conversation struct {
	ID        uint64
	FromID    string
	ToID      string
	Type      ConversationType
	CriptoKey string
	From      User
	To        User
}

type Message struct {
	ConversationID uint64
	From           string
	Text           string
	Attachment     string
	Time           time.Time
	Conversation
}

type UnreadMessage struct {
	ConversationID uint64
	From           string
	To             string
	Time           time.Time
	Message
}
