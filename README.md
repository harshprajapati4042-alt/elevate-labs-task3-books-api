# elevate-labs-task3-books-api

Books REST API (Node.js + Express)

A simple REST API to manage a list of books. It supports full CRUD operations. Data is stored in memory (an array), so no database is needed. Data resets when the server restarts.

Tools Used :
Node.js
Express.js
VS Code
Postman (for testing)

How to Run :
Install dependencies: npm install
Start the server: npm start
Server runs at http://localhost:3000

Endpoints :
GET /books - Get all books
GET /books/:id - Get one book by id
POST /books - Add a new book
PUT /books/:id - Update a book by id
DELETE /books/:id - Delete a book by id

Status Codes Used :
200 OK - request successful
201 Created - new book added
400 Bad Request - missing title/author or invalid JSON
404 Not Found - book or route does not exist
500 Internal Server Error - unexpected server problem

What I Learned :
REST API basics and HTTP methods
Express routing and middleware
Parsing JSON with express.json()
Error handling and status codes
Testing APIs with Postman
