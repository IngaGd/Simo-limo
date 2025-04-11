const express = require("express");
const router = express.Router();
const userMessageController = require("../controllers/userMessageController");
// const { validateOrder } = require("../middleware/validationmiddleware");
const { csrcMiddleware } = require("../middleware/csrfMiddleware");

router.post(
  "/user-message",
  // validateOrder,
  csrcMiddleware,
  userMessageController.sendUserMessage
);

module.exports = router;
