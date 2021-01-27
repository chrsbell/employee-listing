const express = require("express");
const router = express.Router();
const data = require("../db");

/**
 * Returns entire employee list with available departments.
 */
router.get("/", (req, res) => {
  const departments = new Set();
  data.forEach((employee) => departments.add(employee.department));
  res.status(200).send({ list: data, categories: [...departments] });
});

/**
 * Filters the JSON by the search term.
 */
router.get("/search", (req, res) => {
  const departments = new Set();
  let { term } = req.query;
  term = term.toLowerCase();
  const filtered = data.filter((employee) => {
    departments.add(employee.department);
    return employee.name.toLowerCase().includes(term);
  });
  res.status(200).send({ list: filtered, categories: [...departments] });
});

module.exports = router;
