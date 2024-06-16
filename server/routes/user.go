package routes

import (
	"github.com/labstack/echo/v4"

	"github.com/pasin-mosps/FDATSET/controllers"
	"github.com/pasin-mosps/FDATSET/middlewares"
)

func UserRoutes(routes *echo.Echo) {
	routes.POST("/users/signup", controllers.SignUp)
	routes.POST("/users/login", controllers.Login)
	// routes.DELETE("/users/logout", controllers.Logout)
}

func ViewDashboard(g *echo.Group) {
	g.GET("", middlewares.RoleCheck(controllers.ViewDashBoardClient, controllers.ViewDashBoardAdmin))
}
