const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.post("/payment-notification", notificationController.postNotification);

module.exports = router;
