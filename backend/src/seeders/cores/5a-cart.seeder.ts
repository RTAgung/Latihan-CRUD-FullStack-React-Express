import {QueryInterface, Sequelize} from "sequelize";
import {v4 as uuidV4} from "uuid";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const users: any = await queryInterface.sequelize.query(
            "SELECT id FROM users",
        ).then(result => result[0]);
        const products: any = await queryInterface.sequelize.query(
            "SELECT id, price FROM products",
        ).then(result => result[0]);

        let carts = [];
        for (let i = 1; i <= 100; i++) {
            const product = products[Math.floor(Math.random() * products.length)];
            const user = users[Math.floor(Math.random() * users.length)];

            const existedCartIndex = carts.findIndex(cart => {
                    return cart.productId === product.id && cart.userId === user.id
                }
            );
            if (existedCartIndex == -1) {
                carts.push({
                    id: uuidV4(),
                    userId: user.id,
                    productId: product.id,
                    qty: 1,
                    totalPrice: product.price,
                });
            } else {
                carts[existedCartIndex].qty += 1;
                carts[existedCartIndex].totalPrice += product.price;
            }
        }
        await queryInterface.bulkInsert("carts", carts, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("carts", {});
    },
};