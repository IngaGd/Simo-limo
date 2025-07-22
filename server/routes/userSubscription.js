const express = require("express");
const router = express.Router();
const {
  validateSubscriptionInput,
} = require("../middleware/validateSubscriptionInput");
const { csrcMiddleware } = require("../middleware/csrfMiddleware");
const userSubscriptionController = require("../controllers/userSubscriptionController");

router.post(
  "/user-subscription",
  validateSubscriptionInput,
  csrcMiddleware,
  userSubscriptionController.setUserSubscription
);

module.exports = router;
