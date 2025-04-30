import express from "express";
import UserController from "../controller/user.controller.js";

const router = express.Router();

router.get("/cart/:id", UserController.getUserCartById);
router.delete("/cart/:id", UserController.deleteCartById);
router.post("/cart/:id", UserController.createCartById);

export default router;
