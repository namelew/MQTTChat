package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
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

func UsersGet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	if len(vars) != 1 {
		http.Error(w, "Unexpected number of params in the URL", http.StatusBadRequest)
		return
	}

	id, exist := vars["id"]

	if !exist {
		http.Error(w, "Don't find the expected url params", http.StatusBadRequest)
		return
	}

	var user models.User

	trans := databases.MainDatabase.First(&user, models.User{ID: id})

	if trans.Error != nil {
		http.Error(w, "Unable to find user in database", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	err := json.NewEncoder(w).Encode(messages.User{
		Id:   user.ID,
		Name: user.Name,
	})
	if err != nil {
		http.Error(w, "Failed to encode user data", http.StatusInternalServerError)
	}
}
