package models

import "time"

type ConversationType uint8

const (
	OneToOne  ConversationType = 0
	OneToMany ConversationType = 1
)

type User struct {
	ID             string    `gorm:"primary_key"`
	Name           string    `gorm:"index"`
	LastConnection time.Time `gorm:"index"`
}

type Conversation struct {
	ID        uint64 `gorm:"primary_key"`
	FromID    string
	ToID      string
	Type      ConversationType
	CriptoKey string
	From      User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	To        User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

type Message struct {
	ID             uint64 `gorm:"primary_key"`
	ConversationID uint64 `gorm:"index"`
	From           string `gorm:"index"`
	Text           string
	Attachment     string
	Time           time.Time `gorm:"index"`
	Conversation   `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type UnreadMessage struct {
	MessageID uint64    `gorm:"primary_key"`
	To        string    `gorm:"primary_key"`
	Time      time.Time `gorm:"primary_key"`
	Message   `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
