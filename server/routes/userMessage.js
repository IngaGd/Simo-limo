const express = require("express");
const router = express.Router();
const userMessageController = require("../controllers/userMessageController");
const {
  validateUserMessageInput,
} = require("../middleware/validateUserMessageInput");
const { csrcMiddleware } = require("../middleware/csrfMiddleware");

router.post(
  "/user-message",
  validateUserMessageInput,
  csrcMiddleware,
  userMessageController.sendUserMessage
);

module.exports = router;
