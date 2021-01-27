const express = require("express");
const router = express.Router();
const data = require("../db");

/**
 * Returns an age range string.
 */
const getAgeRange = (age, range = 5) => {
  const min = Math.floor(age / range) * range;
  const max = Math.ceil(age / range) * range;
  return { min, max };
};

const filterEmployees = (term) => {
  term = term.toLowerCase();
  const departments = new Set();
  const ageRanges = {};
  let filtered = data.filter((employee) => {
    return employee.name.toLowerCase().includes(term);
  });
  filtered.forEach((employee) => {
    departments.add(employee.department);
    const ageRange = getAgeRange(employee.age);
    ageRanges[JSON.stringify(ageRange)] = ageRange;
  });
  return {
    list: filtered,
    departments: [...departments],
    ageRanges: Object.values(ageRanges).sort((a, b) => a.min - b.min),
  };
};

/**
 * Returns entire employee list with available departments and age ranges.
 */
router.get("/", (req, res) => {
  res.status(200).send(filterEmployees(""));
});

/**
 * Returns employee list filtered by name with available departments and age ranges.
 */
router.get("/search", (req, res) => {
  let { term } = req.query;
  res.status(200).send(filterEmployees(term));
});

module.exports = router;
