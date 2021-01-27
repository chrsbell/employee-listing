const express = require("express");
const router = express.Router();
const data = require("../db");

/**
 * Returns an age range string.
 */
const getAgeRange = (age, range = 5) => {
  let min = Math.floor(age / range) * range;
  let max = Math.ceil(age / range) * range;
  if (min === max) {
    max += range;
  }
  return { min, max };
};

const nameFilter = (employee, name) =>
  employee.name.toLowerCase().includes(name);

const ageFilter = (employee, minAge, maxAge) =>
  employee.age >= minAge && employee.age <= maxAge;

const departmentFilter = (employee, department) => {
  if (department) {
    return employee.department === department;
  }
  // default to true if there was no department selected
  return true;
};

/**
 * Filters and formats employee data based on name/age range/department
 */
const filter = (name = "", minAge = 0, maxAge = 120, department = "") => {
  name = name.toLowerCase();
  const departments = new Set();
  const ageRanges = {};
  let filtered = data.filter((employee) => {
    return (
      nameFilter(employee, name) &&
      ageFilter(employee, minAge, maxAge) &&
      departmentFilter(employee, department)
    );
  });

  // Create list of departments and age ranges that apply to filtered employees
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
 * Send the entire employee list.
 */
router.get("/", (req, res) => {
  res.status(200).send(filter());
});

/**
 * Send employee list filtered by name with available departments and age ranges.
 */
router.get("/search", (req, res) => {
  let { name, minAge, maxAge, department } = req.query;
  res.status(200).send(filter(name, minAge, maxAge, department));
});

module.exports = router;
