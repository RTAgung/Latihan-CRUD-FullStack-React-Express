import { v4 as uuidV4 } from "uuid";
import db from "../models/index.js";

class ProductService {
    async updateStock(products: any): Promise<any> {
        try {
            products.forEach(async (product: any) => {
                const id = product.id;
                const stock = await db.Product.findByPk(id).then(
                    (res: any) => res.stock
                );
                await db.Product.update(
                    {
                        stock: stock - product.quntity,
                    },
                    {
                        where: {
                            id: product.id,
                        },
                    }
                );
            });

            return true;
        } catch (error: any) {
            throw new Error("failed to fetch: " + error.message);
        }
    }
}

export default new ProductService();
