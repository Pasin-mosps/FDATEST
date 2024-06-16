package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username	string		`json: " username" validate:"required,min=2,max=20"`
	Password	string		`json: "password" validate:"required,min=2,max=20"`
	Role		string		`json: "role" default: "user"`
}

type Product struct {
	gorm.Model
	Name	string		`json: "productName"`
	Detail	string		`json: "productDetail"`
	Price	int			`json: "productPrice"`
}