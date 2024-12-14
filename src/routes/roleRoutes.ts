import { Router, Request, Response } from 'express';
import connection from '../config/db';
import mysql from 'mysql2/promise';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Create Role
router.post('/', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    const { roleName, description } = req.body;

    if (!roleName) {
        res.status(400).json({ message: 'Role name is required' });
        return;
    }

    try {
        const query = `INSERT INTO roles (roleName, description) VALUES (?, ?)`;
        const [result] = await connection.promise().query<mysql.OkPacket>(query, [roleName, description || null]);
        res.status(201).json({ message: 'Role created successfully', roleId: result.insertId });
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Read All Roles
router.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const [roles] = await connection.promise().query(`SELECT * FROM roles`);
        res.json(roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update Role
router.put('/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { roleName, description } = req.body;

    try {
        const query = `UPDATE roles SET roleName = ?, description = ? WHERE id = ?`;
        await connection.promise().query(query, [roleName, description, id]);
        res.json({ message: 'Role updated successfully' });
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete Role
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const query = `DELETE FROM roles WHERE id = ?`;
        await connection.promise().query(query, [id]);
        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;