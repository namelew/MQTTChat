package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/namelew/MQTTChat/src/server/internal/models"
	"github.com/namelew/MQTTChat/src/server/packages/databases"
	"github.com/namelew/MQTTChat/src/server/packages/messages"
)

func UsersCreate(w http.ResponseWriter, r *http.Request) {
	var request messages.User

	err := json.NewDecoder(r.Body).Decode(&request)

	w.Header().Set("Access-Control-Allow-Origin", "*")

	if err != nil {
		http.Error(w, "Unexpected user data format", http.StatusBadRequest)
		return
	}

	trans := databases.MainDatabase.Save(models.User{
		ID:   request.Id,
		Name: request.Name,
	})

	if trans.Error != nil {
		http.Error(w, "Unable to insert new user in database", http.StatusInternalServerError)
		return
	}
}
