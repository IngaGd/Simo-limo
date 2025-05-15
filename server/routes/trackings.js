const express = require("express");
const router = express.Router();
const visitTrackController = require("../controllers/visitTrackController");

router.post("/track", visitTrackController.trackVisit);

module.exports = router;
