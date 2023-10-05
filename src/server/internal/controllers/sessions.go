package controllers

import (
	"log"
	"net/http"
)

func SessionOpen(w http.ResponseWriter, r *http.Request) {
	log.Println("Abrindo sessão")
}

func SessionClose(w http.ResponseWriter, r *http.Request) {
	log.Println("Fechando sessão")
}
