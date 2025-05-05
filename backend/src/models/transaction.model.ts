import { DataTypes, Model, Sequelize } from "sequelize";
import { TransactionModel } from "../type/transaction.type.js";

export default (sequelize: Sequelize) => {
    class Transaction extends Model<TransactionModel> {
        static associate(models: any) {
            Transaction.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Transaction.belongsTo(models.User, {
                foreignKey: "cashierId",
                as: "cashier",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Transaction.hasOne(models.TransactionDetail, {
                foreignKey: "transactionId",
                as: "transactionDetail",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    Transaction.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            totalPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cashierId: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Transaction",
            tableName: "transactions",
        }
    );

    return Transaction;
};
