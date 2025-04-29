import express from "express";
import ProductRouter from "./product.route.js";

const router = express.Router();

router.use("/products", ProductRouter);

export default router;
