const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// In-memory data
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
];
let nextId = 3; // used to give every new book a unique id

// Helper
function isValidBook(body) {
  return (
    body &&
    typeof body.title === "string" &&
    body.title.trim() !== "" &&
    typeof body.author === "string" &&
    body.author.trim() !== ""
  );
}

// Routes

// Home route (just to check the server is running)
app.get("/", (req, res) => {
  res.send("Books API is running. Try GET /books");
});

// READ all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// READ one book by id
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json(book);
});

// CREATE a new book
app.post("/books", (req, res) => {
  if (!isValidBook(req.body)) {
    return res
      .status(400)
      .json({ message: "Both 'title' and 'author' are required" });
  }
  const newBook = {
    id: nextId++,
    title: req.body.title.trim(),
    author: req.body.author.trim(),
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// UPDATE a book by id
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  if (!isValidBook(req.body)) {
    return res
      .status(400)
      .json({ message: "Both 'title' and 'author' are required" });
  }
  book.title = req.body.title.trim();
  book.author = req.body.author.trim();
  res.status(200).json(book);
});

// DELETE a book by id
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  const deleted = books.splice(index, 1)[0];
  res.status(200).json({ message: "Book deleted", book: deleted });
});

// Error handling

// Unknown route -> 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error-handling middleware (has 4 parameters). Catches errors like invalid JSON.
app.use((err, req, res, next) => {
  console.error(err.message);
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }
  res.status(500).json({ message: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
