const express = require("express");
const axios = require("axios");
const db = require("../db/postgres.js");
const path = require('path')
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("client/public"));
app.use('/share/*', express.static("client/public"));

app.post('/todo', function(req, res) {
  if (req.body.start && req.body.end) {
    db.createTodoStartAndEnd(req.body)
    .then(result => res.send(result))
  } else if (req.body.start) {
    db.createTodoStartOnly(req.body)
    .then(result => res.send(result))
  } else {
    db.createTodo(req.body)
    .then(result => res.send(result))
  }
 })

app.get('/todos', function(req, res) {
  db.getTodos(req.query.id)
  .then(result => res.send(result))
})

app.delete('/todos', function(req, res) {
  db.deleteTodo(req.query.todoID)
  .then(res.send('DELETED'))
})

app.post('/category', function(req, res) {
  db.createCategory(req.body)
  .then(result => res.send(result))
})

app.get('/categories', function(req, res) {
  db.getCategories(req.query.id)
  .then(result => res.send(result))
})

app.put('/bookedApt', function(req, res) {
  db.bookAppointment(req.body)
  .then(result => res.send(result))
})

app.get('/appointments', function(req, res) {
  db.getAppointments(req.query.id)
  .then(result => res.send(result))
})

// app.get('*', (req,res) =>{
//   res.sendFile//(path.join(__dirname, '..', 'client', 'public', 'index.html'))/;
// });

app.get("/test", (req, res) => {
  // res.send("Greetings!");
  res.status(200);
  res.end();
});

app.put("/setTime", (req,res) => {
  var {todo_id, time} = req.body;
  db.setStartTime(todo_id, time)
  .then(result => res.status(200).send(result));
});

app.listen(port, () => {
console.log("listening on port: ", port);
});

module.exports = app;
