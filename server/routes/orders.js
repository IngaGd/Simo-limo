const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const {
  validatePurchaserInput,
} = require("../middleware/validatePurchaserInput");
const { csrcMiddleware } = require("../middleware/csrfMiddleware");

router.post(
  "/order",
  validatePurchaserInput,
  csrcMiddleware,
  orderController.createOrder
);

module.exports = router;
