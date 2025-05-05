import { QueryInterface, Sequelize } from "sequelize";
import { v4 as uuidV4 } from "uuid";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        let roles = [
            {
                id: uuidV4(),
                name: `admin`,
            },
            {
                id: uuidV4(),
                name: `cashier`,
            },
        ];
        await queryInterface.bulkInsert("roles", roles, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("roles", {});
    },
};
