package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/pasin-mosps/FDATSET/middlewares"
	"github.com/pasin-mosps/FDATSET/routes"
)

func main() {
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	routes.UserRoutes(e)
	dashboardGroup := e.Group("/dashboard")
	dashboardGroup.Use(middlewares.Auth())
	routes.ViewDashboard(dashboardGroup)
	e.Logger.Fatal(e.Start(":1323"))
}
