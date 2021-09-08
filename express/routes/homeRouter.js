const express = require("express");
const router = express.Router();

// Main
router.get("/app", (req, res, next) => {
  res.send("Welcome to the main app");
});

module.exports = router;
