package models

import "time"

type Heartbeat struct {
	User      string
	Timestamp time.Time
}

type Status struct {
	User          string
	Online        bool
	LastHeartbeat Heartbeat
}
