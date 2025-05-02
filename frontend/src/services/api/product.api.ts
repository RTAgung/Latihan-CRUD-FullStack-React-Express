/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogOut } from "lucide-react";
import ProductModelAPI from "../../abstract/model.abstract.js";

const BASE_URL_API = "http://127.0.0.1:3000/api";

class ProductAPI extends ProductModelAPI {
    baseUrl: string;

    constructor() {
        super();
        this.baseUrl = BASE_URL_API + "/products";
    }

    async getById(id: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        const data = await response.json();
        return data;
    }

    async getAll(): Promise<any> {
        const response = await fetch(`${this.baseUrl}`);
        const data = await response.json();
        return data;
    }

    async create(product: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        const data = await response.json();
        return data;
    }

    async update(id: string, product: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        return data;
    }

    async delete(id: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    }
}

export default new ProductAPI();
