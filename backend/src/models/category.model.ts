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
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
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
