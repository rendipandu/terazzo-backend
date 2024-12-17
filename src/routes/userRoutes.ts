import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controller/Users";
import { authenticateToken } from "../middleware/authMiddleware"; // Add role-based access control if needed

const router = express.Router();

// Get all users
router.get("/", authenticateToken, getUsers);

// Get a single user by UUID
router.get("/:uuid", authenticateToken, getUserById);

// Create a new user
// router.post("/", authenticateToken, createUser);
router.post("/", createUser);

// Update an existing user
router.put("/:uuid", authenticateToken, updateUser);

// Delete a user
router.delete("/:uuid", authenticateToken, deleteUser);

export default router;