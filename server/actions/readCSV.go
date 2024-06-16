package actions

import (
	"encoding/csv"
	"fmt"
	"os"
)

func ReadCSV(filename string) [][]string {
	var data [][]string

	f, err := os.Open(filename)
	if err != nil {
		fmt.Println("Error reading file:", err)
		return data
	}
	defer f.Close()

	reader := csv.NewReader(f)
	records, err := reader.ReadAll()
	if err != nil {
		fmt.Println("Error reading CSV:", err)
		return data
	}

	for _, record := range records {
		data = append(data, record)
	}

	return data
}

// func getDataHandler(c echo.Context) error {
// 	user := new(models.User)

// 	// Read data based on role
// 	var data [][]string
// 	if user.Role == "admin" {
// 		data = ReadCSV()("clients.csv")
// 		data = append(data, ReadCSV()...("admin.csv")...)
// 	} else {
// 		data = ReadCSV("clients.csv")
// 	}

// 	return c.JSON(http.StatusOK, data)
// }
