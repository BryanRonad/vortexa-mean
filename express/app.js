const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/database");

mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
  console.log("Connected to database", config.database);
});
mongoose.connection.on("error", (err) => {
  console.log("Database error", err);
});

const app = express();

const homeRouter = require("./routes/homeRouter");
const vortexaRouter = require("./routes/vortexaRouter");

const port = 5000;

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", homeRouter);
app.use("/vortexa", vortexaRouter);

app.get("/", (req, res) => {
  res.send("I will support your vortexa endeavours behind the scenes");
});

app.listen(port, () => {
  console.log("Server started on port", port);
});
