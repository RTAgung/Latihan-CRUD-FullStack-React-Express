import { DataTypes, QueryInterface } from "sequelize";

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable("transactions", {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            totalPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cashierId: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
                defaultValue: null,
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
        await queryInterface.dropTable("transactions");
    },
};
