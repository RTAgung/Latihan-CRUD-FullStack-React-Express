import express from "express";
import UserCartController from "../controllers/user_cart.controller.js";

const router = express.Router();

router.get("/:id", UserCartController.getUserCartById);
router.delete("/:id", UserCartController.deleteCartById);
router.post("/:id", UserCartController.createCartById);

export default router;
