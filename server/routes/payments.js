const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-transaction", paymentController.createTransaction);

module.exports = router;
