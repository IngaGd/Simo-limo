const express = require("express");
const router = express.Router();
const shoppingPlacesController = require("../controllers/shoppingPlacesController");

router.get("/places", shoppingPlacesController.getShoppingPlaces);

module.exports = router;
