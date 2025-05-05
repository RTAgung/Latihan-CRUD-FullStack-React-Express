import { Request, Response } from "express";
import db from "../models/index.js";
import { v4 as uuidV4 } from "uuid";

class UserCartController {
    async getUserCartById(req: Request, res: Response): Promise<any> {
        try {
            const userId = req.params.id;
            const users = await db.User.findAll({
                where: { id: userId },
                attributes: {
                    exclude: ["createdAt", "updatedAt"], // Exclude these fields from User
                },
                include: [
                    {
                        model: db.Cart,
                        as: "carts",
                        attributes: {
                            exclude: [
                                "userId",
                                "productId",
                                "createdAt",
                                "updatedAt",
                            ], // Exclude from Cart too
                        },
                        include: [
                            {
                                model: db.Product,
                                as: "product",
                                attributes: {
                                    exclude: ["createdAt", "updatedAt"], // Exclude from Product too
                                },
                            },
                        ],
                    },
                ],
            });

            res.json({
                status: "success",
                message: "User with cart fetched successfully",
                data: users,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async deleteCartById(req: Request, res: Response): Promise<any> {
        try {
            const cartId = req.params.id;
            const cart = await db.Cart.findByPk(cartId);
            if (!cart) {
                res.status(404).json({
                    status: "error",
                    message: "Cart not found",
                });
                return;
            }
            await cart.destroy();
            res.json({
                status: "success",
                message: "Cart deleted successfully",
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }

    async createCartById(req: Request, res: Response): Promise<any> {
        try {
            const userId = req.params.id;
            const productId = req.body.productId;
            const product = await db.Product.findByPk(productId);
            const [cart, created] = await db.Cart.findOrCreate({
                where: { userId, productId },
                defaults: {
                    id: uuidV4(),
                    userId: userId,
                    productId: productId,
                    qty: 1,
                    totalPrice: product.price,
                },
            });

            if (!created) {
                cart.qty += 1;
                cart.totalPrice += product.price;
                await cart.save();
            }

            res.json({
                status: "success",
                message: created
                    ? "Cart created successfully"
                    : "Cart updated successfully",
                data: cart,
            });
        } catch (error: any) {
            res.json({
                status: "error",
                message: error.message,
            });
        }
    }
}

export default new UserCartController();
