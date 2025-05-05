import express from "express";
import ProductRouter from "./product.route.js";
import CategoryRouter from "./category.route.js";
import UserCartRouter from "./user_cart.route.js";
import UserRouter from "./user.route.js";
import RoleRouter from "./role.route.js";
import TransactionRouter from "./transaction.route.js";
import TransactionDetailRouter from "./transaction_detail.route.js";
import AuthRouter from "./auth.route.js";

const router = express.Router();

router.use("/products", ProductRouter);
router.use("/categories", CategoryRouter);
router.use("/user/cart", UserCartRouter);
router.use("/users", UserRouter);
router.use("/roles", RoleRouter);
router.use("/transactions", TransactionRouter);
router.use("/transactions-detail", TransactionDetailRouter);
router.use("/auth", AuthRouter);

export default router;
