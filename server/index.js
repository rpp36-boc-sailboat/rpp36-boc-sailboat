const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const db = require("./report.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("client/public"));

// app.get("/categories", (req, res) => {
//   db.findAllCategories((err, result) => {
//     if (err) {
//       res.status(500).send(err).end();
//     } else {
//       res.status(200).json({ results: result });
//     }
//   });
// });

// app.get("/allTodos", (req, res) => {
//   db.findAllToDos((err, result) => {
//     if (err) {
//       res.status(500).send(err).end();
//     } else {
//       res.status(200).json({ results: result });
//     }
//   });
// });

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

app.listen(port, () => {
  console.log("listening on port: ", port);
});

module.exports = app;
