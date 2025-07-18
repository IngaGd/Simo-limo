const express = require("express");
const router = express.Router();
const userMessageController = require("../controllers/userMessageController");
const { validateInput } = require("../middleware/validationmiddleware");
const { csrcMiddleware } = require("../middleware/csrfMiddleware");

router.post(
  "/user-message",
  validateInput,
  csrcMiddleware,
  userMessageController.sendUserMessage
);

module.exports = router;
