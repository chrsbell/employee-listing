const express = require("express");
const path = require("path");
const compression = require("compression");
const data = require("../db/index.js");

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "..", "public")));

/**
 * API Route for employees
 */
app.get("/api/employees/all", (req, res) => {
  res.status(200).send(data);
});

app.listen(3000, () => {
  console.log("Listening at http://localhost:3000");
});
