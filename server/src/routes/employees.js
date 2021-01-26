const express = require("express");
const router = express.Router();
const data = require("../db/index.js");

/**
 * Returns entire employee list.
 */
router.get("/", (req, res) => {
  res.status(200).send(data);
});

module.exports = router;
