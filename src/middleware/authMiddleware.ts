import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request type to include `user`
declare module 'express-serve-static-core' {
    interface Request {
        user?: string | jwt.JwtPayload; // Adjust the type as per your `user` payload structure
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access token is required' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }

        // Attach the user payload to the request object
        req.user = user;
        next();
    });
};