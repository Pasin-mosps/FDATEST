package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/pasin-mosps/FDATSET/actions"
	// "github.com/pasin-mosps/FDATSET/models"
)

func ViewDashBoardAdmin(c echo.Context) error {

	var data [][]string

	adminData := actions.ReadCSV("admin.csv")
	clientsData := actions.ReadCSV("clients.csv")
	data = append(data, clientsData...)

	data = append(adminData, data...)

	return c.JSON(http.StatusOK, data)
}

func ViewDashBoardClient(c echo.Context) error {

	clientsData := actions.ReadCSV("clients.csv")

	return c.JSON(http.StatusOK, clientsData)
}
