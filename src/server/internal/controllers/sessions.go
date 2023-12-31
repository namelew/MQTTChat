package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/gorilla/websocket"
	"github.com/namelew/MQTTChat/src/server/internal/messaging"
	"github.com/namelew/MQTTChat/src/server/internal/models"
	"github.com/namelew/MQTTChat/src/server/packages/databases"
	"github.com/namelew/MQTTChat/src/server/packages/messages"
	"gorm.io/gorm"
)

func ErrorHandler(w http.ResponseWriter, r *http.Request, status int, reason error) {
	message := messages.Message{
		Type: messages.Error,
		Sender: messages.User{
			Id:   "ServerID",
			Name: "Service Server",
		},
		Timestamp: time.Now(),
		Payload: fmt.Sprintf(`{
					"code": %d,
					"message": %s
				}`, status, reason.Error()),
	}

	payload, err := json.Marshal(&message)

	if err != nil {
		log.Println("Unable to build error message. ", err.Error())
		return
	}

	_, err = w.Write(payload)

	if err != nil {
		log.Println("Unable to send error response from client. ", err.Error())
		return
	}
}

func OriginChecker(r *http.Request) bool {
	origin := r.Header["Origin"]
	if len(origin) == 0 {
		return true
	}

	u, err := url.Parse(origin[0])
	if err != nil {
		return false
	}

	allowedOrigins := []string{"*"}
	for _, ao := range allowedOrigins {
		if ao == "*" || strings.HasSuffix(u.Host, ao) {
			return true
		}
	}

	return false
}

func WebSocket(w http.ResponseWriter, r *http.Request) {
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  2048,
		WriteBufferSize: 1024,
		CheckOrigin:     OriginChecker,
		Error:           ErrorHandler,
	}

	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println("Unable to open session socket. ", err.Error())
		return
	}

	var sessionUser models.User
	var messagingClient *messaging.Client
	var conversations []models.Conversation

	defer func() {
		var userStatus models.Status

		dataString, err := databases.DBCache.HGet(context.Background(), "userStatusHash", sessionUser.ID).Result()

		if err != nil {
			conn.Close()
			messagingClient.Free()
			log.Printf("Unable to read user status data from database cache. %s\n", err.Error())
			return
		}

		err = json.Unmarshal([]byte(dataString), &userStatus)

		if err != nil {
			conn.Close()
			log.Printf("Unable to unmarshall user status data from database cache. %s\n", err.Error())
			return
		}

		userStatus.Online = false

		data, err := json.Marshal(&userStatus)

		if err != nil {
			conn.Close()
			messagingClient.Free()
			log.Printf("Unable to marshall user status data where update status. %s\n", err.Error())
			return
		}

		_, err = databases.DBCache.HSet(context.Background(), "userStatusHash", sessionUser.ID, data).Result()

		if err != nil {
			conn.Close()
			messagingClient.Free()
			log.Printf("Unable to write user status data in database cache. %s\n", err.Error())
			return
		}

		conn.Close()
		messagingClient.Free()
	}()

	for {
		message := messages.Message{}

		err := conn.ReadJSON(&message)

		if err != nil {
			log.Println("Unable to receive message from client. ", err.Error())
			return
		}

		switch message.Type {
		case messages.Login:
			trans := databases.MainDatabase.First(&sessionUser, models.User{ID: message.Sender.Id})

			if trans.Error == gorm.ErrRecordNotFound {
				conn.WriteJSON(&messages.Message{
					Id:        message.Id,
					Type:      messages.Error,
					Timestamp: time.Now(),
					Payload:   "Unable to find informed user",
				})
				return
			}

			if trans.Error != nil {
				conn.WriteJSON(&messages.Message{
					Id:        message.Id,
					Type:      messages.Error,
					Timestamp: time.Now(),
					Payload:   "Unexpected error on registry query",
				})
				return
			}

			trans = databases.MainDatabase.Where("from_id = ? OR to_id = ?", sessionUser.ID, sessionUser.ID).Find(&conversations)

			if trans.Error != nil && trans.Error != gorm.ErrRecordNotFound {
				conn.WriteJSON(&messages.Message{
					Id:        message.Id,
					Type:      messages.Error,
					Timestamp: time.Now(),
					Payload:   "Unexpected error on conversation syncronization",
				})
				return
			}

			log.Println(conversations)

			conn.WriteJSON(&messages.Message{
				Id:        message.Id,
				Type:      messages.Success,
				Timestamp: time.Now(),
			})

			messagingClient = messaging.New(sessionUser)

			if messagingClient == nil {
				conn.WriteJSON(&messages.Message{
					Id:        message.Id,
					Type:      messages.Error,
					Timestamp: time.Now(),
					Payload:   "Unable to open messaging channel",
				})
				return
			}
		case messages.Logout:
			if sessionUser.ID == "" {
				conn.WriteJSON(&messages.Message{
					Id:        message.Id,
					Type:      messages.Error,
					Timestamp: time.Now(),
					Payload:   "Unloged user, please inform your crendetials to continue",
				})
				continue
			}

			sessionUser.LastConnection = time.Now()

			trans := databases.MainDatabase.Save(&sessionUser)

			if trans.Error != nil {
				conn.WriteJSON(&messages.Message{
					Id:        message.Id,
					Type:      messages.Error,
					Timestamp: time.Now(),
					Payload:   "Unexpected error on user last connection update",
				})
				return
			}

			conn.WriteJSON(&messages.Message{
				Id:        message.Id,
				Type:      messages.Success,
				Timestamp: time.Now(),
			})

			return
		case messages.Chat:
			if sessionUser.ID == "" {
				conn.WriteJSON(&messages.Message{
					Id:        message.Id,
					Type:      messages.Error,
					Timestamp: time.Now(),
					Payload:   "Unloged user, please inform your crendetials to continue",
				})
				continue
			}
		case messages.Heartbeat:
			if sessionUser.ID == "" {
				conn.WriteJSON(&messages.Message{
					Id:        message.Id,
					Type:      messages.Error,
					Timestamp: time.Now(),
					Payload:   "Unloged user, please inform your crendetials to continue",
				})
				continue
			}

			userStatus := models.Status{
				User:   message.Sender.Id,
				Online: true,
				LastHeartbeat: models.Heartbeat{
					User:      message.Sender.Id,
					Timestamp: time.Now(),
				},
			}

			data, err := json.Marshal(&userStatus)

			if err != nil {
				log.Printf("Unable to marshall user status data. %s\n", err.Error())
				continue
			}

			_, err = databases.DBCache.HSet(context.Background(), "userStatusHash", message.Sender.Id, data).Result()

			if err != nil {
				log.Printf("Unable to write user status data in database cache. %s\n", err.Error())
				continue
			}
		default:
			conn.WriteJSON(&messages.Message{
				Id:        message.Id,
				Type:      messages.Error,
				Timestamp: time.Now(),
				Payload:   "Unexpected client message",
			})
		}
	}
}
