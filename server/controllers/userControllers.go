package controllers

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"

	"github.com/pasin-mosps/FDATSET/actions"
	"github.com/pasin-mosps/FDATSET/models"
)

func SignUp(c echo.Context) error {

	user := new(models.User)
	if err := c.Bind(user); err != nil {
		c.JSON(http.StatusBadRequest, echo.Map{"error": err.Error()})
		return err
	}

	existingUser, err := actions.FindUser(user.Username)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, "server error11")
	}
	if existingUser != nil {
		return c.String(http.StatusBadRequest, "user already exists!!")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "server error2")
	}

	user.Password = string(hashedPassword)

	file, err := os.OpenFile("clients.csv", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	toCsv := csv.NewWriter(file)
	defer toCsv.Flush()

	err = toCsv.Write([]string{user.Username, user.Password, "client"})
	if err != nil {
		return err
	}

	return c.String(http.StatusOK, " user register success")
}

func Login(c echo.Context) error {
	user := new(models.User)
	if err := c.Bind(user); err != nil {
		return err
	}

	existingUser, err := actions.FindUser(user.Username)
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, "Server Error1")
	}

	if existingUser == nil {
		return c.JSON(http.StatusBadRequest, "User not found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(user.Password)); err != nil {
		return c.JSON(http.StatusBadRequest, "Password Invalid!")
	}
	payload := jwt.MapClaims{
		"user": map[string]interface{}{
			"name": existingUser.Username,
			"role": existingUser.Role,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	tokenString, err := token.SignedString([]byte("jwtsecret"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Server Error")
	}
	return c.JSON(http.StatusOK, echo.Map{"token": tokenString, "payload": payload})

}

// func Logout(c echo.Context) error {

// }
