const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.put(
  "/update-payment-status",
  transactionController.updateTransactionStatus
);

module.exports = router;
