package models

import "gorm.io/gorm"

type Message struct {
	gorm.Model
	FromID  string
	ToID    string
	Payload string
	From    User
	To      User
}
