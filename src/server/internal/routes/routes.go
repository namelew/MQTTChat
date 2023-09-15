package routes

import (
	"log"
	"net/http"
	"os"

	"github.com/namelew/MQTTChat/src/server/internal/controllers"
)

func HandleConnections() {
	http.Handle("/conversations", http.HandlerFunc(controllers.ConversationList))
	http.Handle("/conversations/open", http.HandlerFunc(controllers.ConversationOpen))
	http.Handle("/conversations/close", http.HandlerFunc(controllers.ConversationClose))
	http.Handle("/conversations/messages", http.HandlerFunc(controllers.WebSocket))

	log.Fatal(http.ListenAndServe(":"+os.Getenv("APIPORT"), nil))
}
