package routes

import (
	"os"

	"github.com/labstack/echo/v4"
	"github.com/namelew/mqttchat/internal/controllers"
)

func chatHandler(handler *echo.Echo) {
	handler.GET("/receive/:from/", controllers.ReceiveMessage)
	handler.POST("/send/:to/", controllers.SendMessage)
}

func contactsHandler(handler *echo.Echo) {
	handler.GET("/users/", nil)
	handler.GET("/users/:uid/", nil)
	handler.POST("/users/", controllers.AddUser)
	handler.PUT("/users/:uid/", controllers.UpdateUser)
	handler.DELETE("/users/:uid/", controllers.RemoveUser)
}

func Route() {
	handler := echo.New()

	chatHandler(handler)
	contactsHandler(handler)

	handler.Logger.Fatal(handler.Start(":" + os.Getenv("APIPORT")))
}
