const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const statusesController = require("../controllers/statusesController");

router.put(
  "/update-payment-status",
  transactionController.updateTransactionStatus
);

router.get("/check-payment-status", statusesController.getPaymentStatus);

module.exports = router;
