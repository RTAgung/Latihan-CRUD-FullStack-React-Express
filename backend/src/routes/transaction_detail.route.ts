import express from "express";
import TransactionDetailController from "../controllers/transaction_detail.controller.js";

const router = express.Router();

router.get("/", TransactionDetailController.getAll);
router.get("/:id", TransactionDetailController.getById);

export default router;

