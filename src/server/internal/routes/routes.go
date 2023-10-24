package routes

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/namelew/MQTTChat/src/server/internal/controllers"
)

func HandleConnections() {
	r := mux.NewRouter()

	r.HandleFunc("/session", controllers.WebSocket).Methods("GET")
	r.HandleFunc("/users/{id}", controllers.UsersGet).Methods("GET")
	r.HandleFunc("/users/create", controllers.UsersCreate).Methods("POST")
	r.HandleFunc("/conversations", controllers.ConversationList).Methods("GET")
	r.HandleFunc("/conversations/open", controllers.ConversationOpen).Methods("POST")
	r.HandleFunc("/conversations/close", controllers.ConversationClose).Methods("POST")

	corsObj := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}),
	)

	logger := handlers.LoggingHandler(os.Stdout, corsObj(r))

	log.Fatal(http.ListenAndServe(":"+os.Getenv("APIPORT"), logger))
}
