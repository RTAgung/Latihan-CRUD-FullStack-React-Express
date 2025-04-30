import {DataTypes, Model, Sequelize} from "sequelize";
import {UserModel} from "../type/user.type.js";

export default (sequelize: Sequelize) => {
    class User extends Model<UserModel> {
        static associate(models: any) {
            User.belongsToMany(models.Product, {
                through: 'Cart',
                foreignKey: 'userId',
                as: 'products'
            })
            User.hasMany(models.Cart, {
                foreignKey: 'userId',
                as: 'carts',
            });
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
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