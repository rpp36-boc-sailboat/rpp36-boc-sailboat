const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("client/public"));

app.post('/todo', function(req, res) {
  console.log(req.body)
  res.sendStatus(200)
})

app.post('/category', function(req, res) {
  console.log(req.body)
  res.sendStatus(200)
})

app.get("/test", (req, res) => {
  // res.send("Greetings!");
  res.status(200);
  res.end();
});

app.listen(port, () => {
console.log("listening on port: ", port);
});

module.exports = app;
