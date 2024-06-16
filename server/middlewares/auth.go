package middlewares

import (
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"github.com/pasin-mosps/FDATSET/actions"
)

func Auth() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token := c.Request().Header.Get("token")
			if token == "" {
				return c.String(http.StatusUnauthorized, "No token")
			}
			decoded, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
				return []byte("jwtsecret"), nil
			})
			if err != nil {
				return c.String(http.StatusInternalServerError, "Token Invalid")
			}
			claims, ok := decoded.Claims.(jwt.MapClaims)

			if !ok || !decoded.Valid {
				return c.String(http.StatusInternalServerError, "Token Invalid")
			}
			fmt.Println("claims = ", claims)
			userMap, ok := claims["user"].(map[string]interface{})
			if !ok {
				return c.String(http.StatusInternalServerError, "Invalid user claim")
			}
			userName, ok := userMap["name"].(string)
			fmt.Println("username=", userName)
			if !ok {
				return c.String(http.StatusInternalServerError, "Invalid user claim")
			}
			c.Set("user", userName)

			return next(c)
		}
	}
}

func RoleCheck(clientHandler, adminHandler echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		userName := c.Get("user").(string)
		fmt.Println(userName)
		user, err := actions.FindUser(userName)
		if err != nil {
			fmt.Println(err)
			return c.String(http.StatusInternalServerError, "Access Denied!!!")
		}
		fmt.Println("role=", user.Role)
		if user.Role == "admin" {
			return adminHandler(c)
		} else if user.Role == "client" {
			return clientHandler(c)
		} else {
			return c.String(http.StatusForbidden, "Access Denied!!!")
		}
	}
}
