import {QueryInterface, DataTypes} from "sequelize";

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable("categories", {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            }
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable("categories");
    },
};