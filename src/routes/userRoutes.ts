import { Router, Request, Response } from 'express';
import connection from '../config/db';
import mysql from 'mysql2/promise'; // Untuk koneksi MySQL dengan Promises
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Create User
router.post('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, roleId } = req.body;

    if (!username || !email || !password || !roleId) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    try {
        const query = `INSERT INTO users (username, email, password, roleId) VALUES (?, ?, ?, ?)`;
        const [result] = await connection.promise().query<mysql.OkPacket>(query, [
            username,
            email,
            password,
            roleId,
        ]);
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read All Users
router.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const [users] = await connection.promise().query(`SELECT * FROM users`);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update User
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, password, roleId } = req.body;

    try {
        const query = `UPDATE users SET username = ?, email = ?, password = ?, roleId = ? WHERE id = ?`;
        await connection.promise().query(query, [username, email, password, roleId, id]);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete User
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `DELETE FROM users WHERE id = ?`;
        await connection.promise().query(query, [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;