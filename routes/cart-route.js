const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const cartController = require("../controllers/cart-controller");

router.get("/", authenticate, cartController.getByCart);
router.post("/", authenticate, cartController.createCart);
router.put("/:id", authenticate, cartController.updateCart);
router.delete("/:id", authenticate, cartController.deleteCart);

module.exports = router;
