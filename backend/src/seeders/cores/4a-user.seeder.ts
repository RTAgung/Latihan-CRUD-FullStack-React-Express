import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const roles: any = await queryInterface.sequelize
            .query("SELECT id FROM roles")
            .then((result) => result[0]);

        let users = [];
        for (let i = 1; i <= 10; i++) {
            const id = uuidV4();
            users.push({
                id: id,
                username: `Username${i}`,
                email: `user${i}@example.com`,
                password: bcrypt.hashSync(`${id}_password${i}`, 10),
                roleId: roles[Math.floor(Math.random() * roles.length)].id,
            });
        }
        await queryInterface.bulkInsert("users", users, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("users", {});
    },
};
