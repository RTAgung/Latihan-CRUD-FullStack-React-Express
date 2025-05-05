import {DataTypes, Model, Sequelize} from "sequelize";
import {ProductModel} from "../type/product.type.js";

export default (sequelize: Sequelize) => {
    class Product extends Model<ProductModel> {
        static associate(models: any) {
            Product.belongsTo(models.Category, {
                foreignKey: "categoryId",
                as: "category",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
            Product.belongsToMany(models.User, {
                through: 'Cart',
                foreignKey: 'id',
                as: 'users'
            })
            Product.hasMany(models.Cart, {
                foreignKey: 'productId',
                as: 'carts',
            });
        }
    }

    Product.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            categoryId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            stock: {
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
            modelName: "Product",
            tableName: "products",
        }
    );

    return Product;
};
