import {DataTypes, Model, Sequelize} from "sequelize";
import {CategoryModel} from "../type/category.type";

export default (sequelize: Sequelize) => {
    class Category extends Model<CategoryModel> {
        static associate(models: any) {
            Category.hasMany(models.Product, {
                foreignKey: "categoryId",
                as: "products",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
        }
    }

    Category.init(
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
            modelName: "Category",
            tableName: "categories",
        }
    );

    return Category;
};
