import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidV4 } from "uuid";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const categories: any = await queryInterface.sequelize
            .query("SELECT id FROM categories")
            .then((result) => result[0]);

        let products = [];
        for (let i = 1; i <= 1000; i++) {
            products.push({
                id: uuidV4(),
                name: `Product ${i}`,
                price: Math.ceil(Math.random() * 100) * 1000,
                categoryId:
                    categories[Math.floor(Math.random() * categories.length)]
                        .id,
                stock: Math.floor(Math.random() * 50) + 1,
            });
        }
        await queryInterface.bulkInsert("products", products, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("products", {});
    },
};
