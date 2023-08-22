package controllers

import (
	"encoding/json"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/namelew/mqttchat/internal/database"
	"github.com/namelew/mqttchat/internal/models"
)

type Message struct {
	Time    time.Time
	FromID  string
	ToID    string
	Payload string
}

type User struct {
	ID       string
	Name     string
	Password string
}

func AddUser(c echo.Context) error {
	var request User

	err := json.NewDecoder(c.Request().Body).Decode(&request)

	if err != nil {
		return echo.ErrBadRequest
	}

	res := database.DB.Save(&models.User{
		ID:       request.ID,
		Name:     request.Name,
		Password: request.Password,
	})

	if res.Error != nil {
		return echo.ErrInternalServerError
	}

	return nil
}

func RemoveUser(c echo.Context) error {
	var user models.User

	if c.Param("uid") == "" {
		return echo.ErrBadRequest
	}

	return (database.DB.Delete(&user, models.User{ID: c.Param("uid")})).Error
}

func UpdateUser(c echo.Context) error {
	var request User

	err := json.NewDecoder(c.Request().Body).Decode(&request)

	if err != nil {
		return echo.ErrBadRequest
	}

	if c.Param("uid") == "" {
		return echo.ErrBadRequest
	}

	dbuser := models.User{}

	if err := (database.DB.Find(&dbuser, models.User{ID: c.Param("uid")})).Error; err != nil {
		return echo.ErrInternalServerError
	}

	return (database.DB.Model(&dbuser).UpdateColumns(models.User{
		Name:     request.Name,
		Password: request.Password,
	})).Error
}

func SendMessage(c echo.Context) error {
	return nil
}

func ReceiveMessage(c echo.Context) error {
	return nil
}
