const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { validateOrder } = require("../middleware/validationmiddleware");
const { csrcMiddleware } = require("../middleware/csrfMiddleware");

router.post(
  "/order",
  validateOrder,
  csrcMiddleware,
  orderController.createOrder
);

module.exports = router;
