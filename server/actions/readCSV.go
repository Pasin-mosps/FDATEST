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
