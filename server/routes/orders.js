const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { validateInput } = require("../middleware/validationmiddleware");
const { csrcMiddleware } = require("../middleware/csrfMiddleware");

router.post(
  "/order",
  validateInput,
  csrcMiddleware,
  orderController.createOrder
);

module.exports = router;
