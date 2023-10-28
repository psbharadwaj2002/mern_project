const express = require("express");
const mongoose = require("mongoose");
const mongoDB = require("../backend/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  console.log("Success");
  res.status(200).send("hello world");
});

app.use(express.json());

app.use("/api", require("./routes/CreateUser.route"));
app.use("/api", require("./routes/DisplayData.route"));
app.use("/api", require("./routes/OrderData.route"));

app.listen(port, async () => {
  console.log(`Listening on Port: ${port}`);
  mongoDB();
});
