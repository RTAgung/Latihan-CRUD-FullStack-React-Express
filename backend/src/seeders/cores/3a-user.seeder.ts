import {QueryInterface, Sequelize} from "sequelize";
import {v4 as uuidV4} from "uuid";
import bcrypt from "bcrypt";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        let users = [];
        for (let i = 1; i <= 10; i++) {
            const password = await bcrypt.hash(`password${i}`, 10);
            users.push({
                id: uuidV4(),
                name: `User ${i}`,
                username: `Username${i}`,
                email: `user${i}@example.com`,
                password: password,
            });
        }
        await queryInterface.bulkInsert("users", users, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("users", {});
    },
};