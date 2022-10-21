const express = require("express");
const axios = require("axios");
const db = require("../db/postgres.js");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("client/public"));

var baseURL = 'http://54.85.127.105/';

app.post('/todo', function(req, res) {
  db.createTodo(req.body)
  .then(result => res.send(result))
})

app.get('/todos', function(req, res) {
  db.getTodos(req.query.id)
  .then(result => res.send(result))
})

app.post('/category', function(req, res) {
  db.createCategory(req.body)
  .then(result => res.send(result))
})

app.get('/categories', function(req, res) {
  db.getCategories(req.query.id)
  .then(result => res.send(result))
})

app.get("/test", (req, res) => {
  // res.send("Greetings!");
  res.status(200);
  res.end();
});

// app.delete('/delete', (req, res) => {
//   var todo_id = req.body.id;
//   axios.delete(`http://localhost:3000/tasks/${todo_id}`)
// })
// .then(res => {
//   console.log(res.data);
// })
// .catch((error) => {
//   console.log(error);
// })

app.listen(port, () => {
console.log("listening on port: ", port);
});

module.exports = app;
