package actions

import (
	"encoding/csv"
	"os"

	"github.com/pasin-mosps/FDATSET/models"
)

func FindUser(username string) (*models.User, error) {
	// Open the CSV file
	file, err := os.Open("clients.csv")
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// Create a new CSV reader
	reader := csv.NewReader(file)

	// Read all lines from the CSV file
	lines, err := reader.ReadAll()
	if err != nil {
		return nil, err
	}

	// Loop through each line in the CSV file
	for _, line := range lines {
		// Check if the username and password match
		if line[0] == username {
			// If found, return the user
			return &models.User{
				Username: username,
				Password: line[1],
				Role:     line[2],
				// Add other fields if needed
			}, nil
		}
	}

	// If user not found, return nil
	return nil, nil
}
