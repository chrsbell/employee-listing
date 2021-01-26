const express = require("express");
const path = require("path");
const compression = require("compression");

const employeeRoute = require("./routes/employees.js");

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "..", "public")));

/**
 * API Route for employees
 */
app.use("/api/employees", employeeRoute);

app.listen(3000, () => {
  console.log("Listening at http://localhost:3000");
});
