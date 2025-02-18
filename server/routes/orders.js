const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { validateOrder } = require("../middleware/validationmiddleware");

router.post("/order", validateOrder, orderController.createOrder);

module.exports = router;
