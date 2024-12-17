import { Model, DataTypes } from "sequelize";
import db from "../config/db";

interface UserAttributes {
    id?: number;
    uuid?: string;
    name: string;
    email: string;
    password: string;
    role: string; // Ensure role is defined here
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number;
    public uuid!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: string; // Define role as a property
}

User.init(
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4, // Generates a UUID automatically
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        sequelize: db,
        tableName: "users",
        freezeTableName: true,
        timestamps: false,
    }
);

export default User;