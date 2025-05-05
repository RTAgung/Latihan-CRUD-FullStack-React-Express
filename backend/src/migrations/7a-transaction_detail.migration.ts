import { DataTypes, QueryInterface } from "sequelize";

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable("transaction_details", {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            transactionId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "transactions",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            products: {
                type: DataTypes.JSON,
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
            },
        });
    },

    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable("transaction_details");
    },
};
