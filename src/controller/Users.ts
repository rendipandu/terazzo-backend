import { Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll({
            attributes: ["uuid", "name", "email", "role"], // Exclude sensitive fields like password
        });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a single user by UUID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { uuid } = req.params;

    try {
        const user = await User.findOne({
            where: { uuid },
            attributes: ["uuid", "name", "email", "role"],
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update an existing user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { uuid } = req.params;
    const { name, email, role } = req.body;

    try {
        const user = await User.findOne({ where: { uuid } });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await user.update({ name, email, role });

        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { uuid } = req.params;

    try {
        const user = await User.findOne({ where: { uuid } });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await user.destroy();

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
