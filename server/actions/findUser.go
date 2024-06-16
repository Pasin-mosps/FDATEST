package actions

import (
	"encoding/csv"
	"os"

	"github.com/pasin-mosps/FDATSET/models"
)

func FindUser(username string) (*models.User, error) {
	file, err := os.Open("clients.csv")
	if err != nil {
		return nil, err
	}
	defer file.Close()

	reader := csv.NewReader(file)

	lines, err := reader.ReadAll()
	if err != nil {
		return nil, err
	}

	for _, line := range lines {
		if line[0] == username {
			return &models.User{
				Username: username,
				Password: line[1],
				Role:     line[2],
			}, nil
		}
	}

	return nil, nil
}
