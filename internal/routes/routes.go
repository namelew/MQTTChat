package routes

import "github.com/labstack/echo/v4"

func chatHandler(handler *echo.Echo) {
	handler.GET("/receive/:from/", nil)
	handler.POST("/send/:to/", nil)
}

func contactsHandler(handler *echo.Echo) {
	handler.GET("/contacts/", nil)
	handler.GET("/contacts/:uid/", nil)
	handler.POST("/contacts/", nil)
	handler.PUT("/contacts/:uid/", nil)
	handler.DELETE("/contacts/:uid/", nil)
}

func Route() {
	handler := echo.New()

	chatHandler(handler)
	contactsHandler(handler)

	handler.Logger.Fatal(handler.Start(":8000"))
}
