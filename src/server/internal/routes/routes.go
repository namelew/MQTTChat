package routes

import (
	"log"
	"net/http"
	"os"

	"github.com/namelew/MQTTChat/src/server/internal/controllers"
)

func HandleConnections() {
	http.Handle("/conversation/open", http.HandlerFunc(controllers.ConversationOpen))
	http.Handle("/conversation/list", http.HandlerFunc(controllers.ConversationList))
	http.Handle("/conversation/close", http.HandlerFunc(controllers.ConversationClose))
	http.Handle("/conversation/message/send", http.HandlerFunc(controllers.MessageSend))
	http.Handle("/conversation/message/receive", http.HandlerFunc(controllers.MessageReceive))

	log.Fatal(http.ListenAndServe(":"+os.Getenv("APIPORT"), nil))
}
