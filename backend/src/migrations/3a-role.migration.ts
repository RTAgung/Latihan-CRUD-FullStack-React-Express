import { DataTypes, QueryInterface } from "sequelize";

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable("roles", {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
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
            },
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable("roles");
    },
};

