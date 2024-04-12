const express = require("express");
const router = express.Router();
const auth = require("./auth");
const cartypes = require("./cartype");
const cars = require("./car");


router.use("/auth", auth);
router.use("/cartypes", cartypes);
router.use("/cars", cars);


module.exports = router;