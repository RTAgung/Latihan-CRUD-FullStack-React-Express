import { DataTypes, Model, Sequelize } from "sequelize";
import { UserModel } from "../type/user.type.js";

export default (sequelize: Sequelize) => {
    class User extends Model<UserModel> {
        static associate(models: any) {
            User.belongsToMany(models.Product, {
                through: "Cart",
                foreignKey: "userId",
                as: "products",
            });
            User.hasMany(models.Cart, {
                foreignKey: "userId",
                as: "carts",
            });
            User.belongsTo(models.Role, {
                foreignKey: "roleId",
                as: "role",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            User.hasMany(models.Transaction, {
                foreignKey: "userId",
                as: "userTransactions",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            User.hasMany(models.Transaction, {
                foreignKey: "cashierId",
                as: "cashierTransactions",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            roleId: {
                type: DataTypes.UUID,
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
            modelName: "User",
            tableName: "users",
        }
    );

    return User;
};
