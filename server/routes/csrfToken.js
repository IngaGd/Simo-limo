const express = require("express");
const router = express.Router();
const csrfTokenController = require("../controllers/csrfTokenController");
const { csrcMiddleware } = require("../middleware/csrfMiddleware");

router.get("/csrf-token", csrcMiddleware, csrfTokenController.getCsrfToken);

module.exports = router;
