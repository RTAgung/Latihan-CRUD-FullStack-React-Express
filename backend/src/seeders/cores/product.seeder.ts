import { QueryInterface, Sequelize } from "sequelize";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        let products = [
            {
                id: 1,
                name: "Product 1",
                price: 10.0,
                category: "Category 1",
                stock: 100,
            },
            {
                id: 2,
                name: "Product 2",
                price: 8.4,
                category: "Category 2",
                stock: 10,
            },
            {
                id: 3,
                name: "Product 3",
                price: 13.99,
                category: "Category 1",
                stock: 40,
            },
            {
                id: 4,
                name: "Product 4",
                price: 4.59,
                category: "Category 1",
                stock: 5,
            },
        ];

        await queryInterface.bulkInsert("products", products, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("products", {});
    },
};
