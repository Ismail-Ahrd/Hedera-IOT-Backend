const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDB = require("./db");
const { default: mongoose } = require("mongoose");
const devicesRoute = require("./routes/devices");
const accountsRoute = require("./routes/accounts");

const app = express();
const port = process.env.SERVER_PORT;

connectToDB();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/devices", devicesRoute);
app.use("/accounts", accountsRoute);
app.get("/", (req, res) => {
  res.send("app v1");
});

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
  process.exit(1);
});
