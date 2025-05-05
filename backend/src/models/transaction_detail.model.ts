import { DataTypes, Model, Sequelize } from "sequelize";
import { TransactionDetailModel } from "../type/transaction_detail.type.js";

export default (sequelize: Sequelize) => {
    class TransactionDetail extends Model<TransactionDetailModel> {
        static associate(models: any) {
            TransactionDetail.belongsTo(models.Transaction, {
                foreignKey: "transactionId",
                as: "transaction",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    TransactionDetail.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            transactionId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            products: {
                type: DataTypes.JSON,
                allowNull: false,
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
            modelName: "TransactionDetail",
            tableName: "transaction_details",
        }
    );

    return TransactionDetail;
};
