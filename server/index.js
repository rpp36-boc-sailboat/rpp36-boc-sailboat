const express = require("express");
const axios = require("axios");
const db = require("../db/postgres.js");
const path = require("path");
const app = express();
const port = 3000;
const dbMetrics = require("./report.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client/public"));
app.use("/share/*", express.static("client/public"));
app.use("/metrics/", express.static("client/public"));

app.post("/todo", function (req, res) {
  db.createTodo(req.body).then((result) => res.send(result));
});

app.get("/todos", function (req, res) {
  db.getTodos(req.query.id).then((result) => res.send(result));
});

app.delete("/todos", function (req, res) {
  console.log(req);
  db.deleteTodo(req.query.todoID).then(res.send("DELETED"));
});

app.post("/category", function (req, res) {
  db.createCategory(req.body).then((result) => res.send(result));
});

app.get("/categories", function (req, res) {
  db.getCategories(req.query.id).then((result) => res.send(result));
});

app.put("/bookedApt", function (req, res) {
  db.bookAppointment(req.body).then((result) => res.send(result));
});

app.get("/appointments", function (req, res) {
  db.getAppointments(req.query.id).then((result) => res.send(result));
});

// app.get('*', (req,res) =>{
//   res.sendFile//(path.join(__dirname, '..', 'client', 'public', 'index.html'))/;
// });

app.get("/completedTasks", (req, res) => {
  // console.log("ggg", req.query); // inoked 3 ??
  dbMetrics.findAllToDos_TR(
    req.query.timeRange,
    req.query.customRange,
    req.query.catg,
    (err, result) => {
      if (err) {
        res.status(500).send(err).end();
      } else {
        res.status(200).json({ results: result });
      }
    }
  );
});

app.get("/completedTasksPerCatg", (req, res) => {
  // console.log("ggg", req.query.timeRange);
  dbMetrics.findAllPerCategory(
    req.query.catg,
    req.query.timeRange,
    (err, result) => {
      if (err) {
        // console.log("errrr", err);
        res.status(500).send(err).end();
      } else {
        res.status(200).json({ results: result });
      }
    }
  );
});

app.get("/updateTaskDuration", (req, res) => {
  // console.log("ggg", req.body);
  dbMetrics.updateTaskDuration(
    req.query.newDuration,
    req.query.todoID,
    (err, result) => {
      if (err) {
        res.status(500).send(err).end();
      } else {
        // console.log("rezz", result);
        res.status(200).json({ results: result });
      }
    }
  );
});

app.put("/setTime", (req, res) => {
  var { todo_id, time } = req.body;
  db.setStartTime(todo_id, time).then((result) => res.status(200).send(result));
});

app.listen(port, () => {
  console.log("listening on port: ", port);
});

module.exports = app;
