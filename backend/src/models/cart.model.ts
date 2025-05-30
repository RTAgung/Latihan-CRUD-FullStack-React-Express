import {DataTypes, Model, Sequelize} from "sequelize";
import {CartModel} from "../type/cart.type.js";

export default (sequelize: Sequelize) => {
    class Cart extends Model<CartModel> {
        static associate(models: any) {
            Cart.belongsTo(models.Product, {
                foreignKey: "productId",
                as: "product",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
            Cart.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
        }
    }

    Cart.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            totalPrice: {
                type: DataTypes.INTEGER,
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
            modelName: "Cart",
            tableName: "carts",
        }
    );

    return Cart;
};