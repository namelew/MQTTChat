package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/gorilla/websocket"
	"github.com/namelew/MQTTChat/src/server/packages/messages"
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

	defer conn.Close()

	for {
		message := messages.Message{}

		err := conn.ReadJSON(&message)

		if err != nil {
			log.Println("Unable to receive message from client. ", err.Error())
			continue
		}

		log.Println(message)

		conn.WriteJSON(&message)
	}
}
