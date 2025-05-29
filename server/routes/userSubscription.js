const express = require("express");
const router = express.Router();
// const { validateInput } = require("../middleware/validationmiddleware");
const { csrcMiddleware } = require("../middleware/csrfMiddleware");
const userSubscriptionController = require("../controllers/userSubscriptionController");

router.post(
  "/user-subscription",
  // validateInput,
  csrcMiddleware,
  userSubscriptionController.setUserSubscription
);

module.exports = router;
