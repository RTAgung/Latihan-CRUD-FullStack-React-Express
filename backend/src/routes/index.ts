import express from "express";
import ProductRouter from "./product.route.js";
import CategoryRouter from "./category.route.js";
import UserRouter from "./user.route.js";

const routerRoot = express.Router();

routerRoot.use("/products", ProductRouter);
routerRoot.use("/categories", CategoryRouter);
routerRoot.use("/user", UserRouter);

export default routerRoot;
