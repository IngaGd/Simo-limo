const express = require("express");
const router = express.Router();
const userMessageController = require("../controllers/userMessageController");
const { csrcMiddleware } = require("../middleware/csrfMiddleware");

router.post(
  "/user-message",
  csrcMiddleware,
  userMessageController.sendUserMessage
);

module.exports = router;
