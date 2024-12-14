import { Request, Response, NextFunction } from 'express';

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = req.user;

        if (!user || !roles.includes((user as any).role)) {
            res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            return;
        }

        next();
    };
};