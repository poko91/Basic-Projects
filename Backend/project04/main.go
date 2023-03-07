package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist *Artist `json:"artist"`
}

type Artist struct {
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

// Slice of albums
var albums []Album

func getAlbums(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(albums)
}

func getAlbum(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range albums {

		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
}

func deleteAlbum(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range albums {

		if item.ID == params["id"] {
			albums = append(albums[:index], albums[index+1:]...)
			break
		}
	}
	fmt.Fprintf(w, "Album deleted successfully!")
}

func createAlbum(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var new_album Album
	_ = json.NewDecoder(r.Body).Decode(&new_album)
	new_album.ID = strconv.Itoa(rand.Intn(1000))
	albums = append(albums, new_album)
	json.NewEncoder(w).Encode(&new_album)
}

func updateAlbum(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range albums {
		if item.ID == params["id"] {
			albums = append(albums[:index], albums[index+1:]...)
			var updated_album Album
			_ = json.NewDecoder(r.Body).Decode(&updated_album)
			updated_album.ID = params["id"]
			albums = append(albums, updated_album)
			json.NewEncoder(w).Encode(updated_album)
			return
		}
	}
}

func main() {
	router := mux.NewRouter()

	//Prepopulate struct
	albums = append(albums, Album{ID: "1", Title: "Thriller", Artist: &Artist{Firstname: "Michael", Lastname: "Jackson"}})
	albums = append(albums, Album{ID: "2", Title: "Moody Blue", Artist: &Artist{Firstname: "Elvis", Lastname: "Presley"}})
	albums = append(albums, Album{ID: "3", Title: "In the Wee Small Hours", Artist: &Artist{Firstname: "Frank", Lastname: "Sinatra"}})

	router.HandleFunc("/albums", getAlbums).Methods("GET")
	router.HandleFunc("/albums/{id}", getAlbum).Methods("GET")
	router.HandleFunc("/albums", createAlbum).Methods("POST")
	router.HandleFunc("/albums/{id}", updateAlbum).Methods("PUT")
	router.HandleFunc("/albums/{id}", deleteAlbum).Methods("DELETE")

	fmt.Printf("Starting server at port 8000\n")
	log.Fatal(http.ListenAndServe(":8000", router))

}
