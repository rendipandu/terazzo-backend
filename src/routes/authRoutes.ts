import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../config/db';
import mysql from 'mysql2/promise'; // Ensure you're using mysql2 with Promises.

const router = Router();

// Register User
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { username, password, email, createdBy } = req.body;

    if (!username || !password || !email) {
        res.status(400).json({ message: 'Username, password, and email are required' });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (username, password, email, createdBy) VALUES (?, ?, ?, ?)';
        const [result] = await connection.promise().query<mysql.OkPacket>(query, [
            username,
            hashedPassword,
            email,
            createdBy || null,
        ]);

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login User
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
        res.status(400).json({ message: 'Username or email, and password are required' });
        return;
    }

    try {
        const query = username
            ? 'SELECT * FROM users WHERE username = ?'
            : 'SELECT * FROM users WHERE email = ?';

        const identifier = username || email;

        const [results] = await connection.promise().query<mysql.RowDataPacket[]>(query, [identifier]);

        if (results.length === 0) {
            res.status(404).json({ message: 'Invalid credentials' }); // Avoid revealing whether username/email exists.
            return;
        }

        const user = results[0];
        console.log('user: ', user)
        console.log('password: ', password)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '24h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;