package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/namelew/MQTTChat/src/server/internal/models"
	"github.com/namelew/MQTTChat/src/server/packages/databases"
	"github.com/namelew/MQTTChat/src/server/packages/messages"
	"github.com/namelew/MQTTChat/src/server/packages/randomizer"
	"gorm.io/gorm"
)

func ConversationOpen(w http.ResponseWriter, r *http.Request) {
	var request messages.Conversation

	err := json.NewDecoder(r.Body).Decode(&request)

	if err != nil {
		http.Error(w, "Unexpected conversation data format", http.StatusBadRequest)
		return
	}

	mapper := func(slice []messages.User) []string {
		new := make([]string, len(slice))

		for id := range slice {
			new[id] = slice[id].Id
		}

		return new
	}

	var conversation models.Conversation

	idList := mapper(request.Participants)

	trans := databases.MainDatabase.Where("from_id IN ? OR to_id IN ?", idList, idList).First(conversation)

	if trans.Error != nil && trans.Error != gorm.ErrRecordNotFound {
		http.Error(w, "Unable to query conversation informations from database", http.StatusInternalServerError)
		return
	}

	if trans.Error != gorm.ErrRecordNotFound {
		http.Error(w, "This conversation already exists", http.StatusInternalServerError)
		return
	}

	key := randomizer.RandomUTF8String(256)

	trans = databases.MainDatabase.Create(&models.Conversation{
		FromID:    idList[0],
		ToID:      idList[1],
		Type:      request.Type,
		CriptoKey: key,
	})

	if trans.Error != nil {
		http.Error(w, "Unable to create conversation", http.StatusInternalServerError)
		return
	}
}

func ConversationList(w http.ResponseWriter, r *http.Request) {

}

func ConversationClose(w http.ResponseWriter, r *http.Request) {
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

	validID, err := strconv.ParseUint(id, 10, 64)

	if err != nil {
		http.Error(w, "Unexpected number format to ID param", http.StatusBadRequest)
		return
	}

	trans := databases.MainDatabase.Delete(&models.Conversation{}, models.Conversation{ID: validID})

	if trans.Error != nil {
		http.Error(w, "Unable to close conversation", http.StatusInternalServerError)
		return
	}
}
