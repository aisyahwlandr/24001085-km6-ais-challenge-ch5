const express = require("express");
const router = express.Router();

const cartypeController = require("../controller/cartype");
const { authMiddleware } = require("../middleware/auth");

router
    .route("/")
    .get(authMiddleware(["member", "admin", "superadmin"]), cartypeController.getCartypes)
    .post(authMiddleware(["admin", "superadmin"]), cartypeController.createCartype);

router
    .route("/:id")
    .get(authMiddleware(["user", "admin", "superadmin"]), cartypeController.getCartype)
    .put(authMiddleware(["admin", "superadmin"]),cartypeController.updateCartype)
    .delete(authMiddleware(["admin", "superadmin"]),cartypeController.deleteCartype);

module.exports = router;