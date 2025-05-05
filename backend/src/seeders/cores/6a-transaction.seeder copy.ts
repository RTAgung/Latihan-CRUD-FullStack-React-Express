import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidV4 } from "uuid";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const users: any = await queryInterface.sequelize
            .query("SELECT id FROM users")
            .then((result) => result[0]);

        let transactions = [];
        for (let i = 1; i <= 10; i++) {
            transactions.push({
                id: uuidV4(),
                userId: users[Math.floor(Math.random() * users.length)].id,
                totalPrice: 100000,
                cashierId: null,
            });
        }
        await queryInterface.bulkInsert("transactions", transactions, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("transactions", {});
    },
};
