import {QueryInterface, Sequelize} from "sequelize";
import {v4 as uuidV4} from "uuid";

export default {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        let categories = [];
        for (let i = 1; i <= 10; i++) {
            categories.push({
                id: uuidV4(),
                name: `Category ${i}`,
            });
        }

        await queryInterface.bulkInsert("categories", categories, {});
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        await queryInterface.bulkDelete("categories", {});
    },
};
