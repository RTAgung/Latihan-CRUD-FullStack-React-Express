import { DataTypes, Model, Sequelize } from "sequelize";
import { RoleModel } from "../type/role.type.js";

export default (sequelize: Sequelize) => {
    class Role extends Model<RoleModel> {
        static associate(models: any) {
            Role.hasOne(models.User, {
                foreignKey: "roleId",
                as: "user",
                onDelete: "CASCADE",
                onUpdate: "CASCADET",
            });
        }
    }

    Role.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
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
            modelName: "Role",
            tableName: "roles",
        }
    );

    return Role;
};
