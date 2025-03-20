package main

// go mod init mi-api
// go get -u github.com/gin-gonic/gin
// go run api.go

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Post struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

var posts = []Post{
	{ID: 1, Title: "Primer post", Content: "Contenido del primer post"},
	{ID: 2, Title: "Segundo post", Content: "Contenido del segundo post"},
}

func getPosts(c *gin.Context) {
	c.JSON(http.StatusOK, posts)
}

func getPostById(c *gin.Context) {
	id := c.Param("id")
	for _, post := range posts {
		if strconv.Itoa(post.ID) == id {
			c.JSON(http.StatusOK, post)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
}

func postNewPost(c *gin.Context) {
	var newPost Post
	if err := c.BindJSON(&newPost); err == nil {
		newPost.ID = len(posts) + 1
		posts = append(posts, newPost)
		c.JSON(http.StatusCreated, newPost)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
	}
}

func main() {
	router := gin.Default()
	router.GET("/posts", getPosts)
	router.GET("/posts/:id", getPostById)
	router.POST("/posts", postNewPost)

	router.Run("localhost:3003")
}
