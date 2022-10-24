const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const db = require("./report.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client/public"));

app.get("/completedTasks", (req, res) => {
  // console.log("ggg", req.query.timeRange);
  db.findAllToDos_TR(req.query.timeRange, req.query.catg, (err, result) => {
    if (err) {
      res.status(500).send(err).end();
    } else {
      res.status(200).json({ results: result });
    }
  });
});

app.get("/completedTasksPerCatg", (req, res) => {
  // console.log("ggg", req.query.timeRange);
  db.findAllPerCategory(req.query.catg, req.query.timeRange, (err, result) => {
    if (err) {
      // console.log("errrr", err);
      res.status(500).send(err).end();
    } else {
      res.status(200).json({ results: result });
    }
  });
});

app.get("/updateTaskDuration", (req, res) => {
  // console.log("ggg", req.body);
  db.updateTaskDuration(
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

app.listen(port, () => {
  console.log("listening on port: ", port);
});

module.exports = app;
