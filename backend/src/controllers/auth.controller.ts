import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";
import { env } from "process";

class AuthController {
    async login(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;
            const user = await UserService.login(email, password);

            if (!user) {
                return res.status(401).json({
                    status: "error",
                    message: "Invalid email or password",
                });
            }

            const encodedString = Buffer.from(
                JSON.stringify({
                    id: user.id,
                    username: user.username,
                    roleId: user.roleId,
                })
            ).toString("base64");

            const token = jwt.sign(
                { ___: encodedString },
                env.JWT_SECRET_KEY ?? "",
                { expiresIn: "1M" }
            );

            res.status(200).json({
                status: "success",
                message: "Login successful",
                data: { token },
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async decode(req: Request, res: Response): Promise<any> {
        try {
            const token = req.body.token;
            const buffer = Buffer.from(token, "base64");
            const string = buffer.toString("utf-8");

            res.status(200).json({
                status: "success",
                message: "Token decoded successfully",
                data: JSON.parse(string),
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async register(req: Request, res: Response): Promise<any> {
        try {
            const response = await UserService.create({ ...req.body });

            res.status(201).json({
                status: "success",
                message: "User registered successfully",
                data: response,
            });
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}

export default new AuthController();
