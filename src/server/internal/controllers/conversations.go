package controllers

import (
	"log"
	"net/http"
)

func ConversationOpen(w http.ResponseWriter, r *http.Request) {
	log.Println("Abrindo conexão")
}

func ConversationList(w http.ResponseWriter, r *http.Request) {

}

func ConversationClose(w http.ResponseWriter, r *http.Request) {

}
