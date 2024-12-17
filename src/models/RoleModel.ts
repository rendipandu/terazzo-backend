import { Model, DataTypes } from "sequelize";
import db from "../config/db";

interface RoleAttributes {
    id?: number; // Optional because it's auto-incremented
    name: string; // e.g., 'admin', 'user'
    description?: string; // Optional description
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
    public id!: number;
    public name!: string;
    public description?: string;
}

Role.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure role names are unique
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        tableName: "roles",
        freezeTableName: true,
        timestamps: false,
    }
);

export default Role;