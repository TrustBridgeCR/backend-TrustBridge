import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import prisma from '../config/prisma';

interface AuthInfo {
  message?: string;
  status?: number;
}

interface AuthUser {
  walletAddress: string;
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized - Please login first' });
};

export const isLender = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    const userId = req.user?.id;
    try {
      const userRoles = await prisma.roleUser.findMany({
        where: { userId },
        include: {
          role: true,
        },
      });

      const hasLenderRole = userRoles.some((roleUser: { role: { name: string; }; }) => roleUser.role.name === 'lender');
      
      if (hasLenderRole) {
        return next();
      } else {
        return res.status(403).json({ error: 'Forbidden - Access restricted to lenders only' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
  }
  res.status(401).json({ error: 'Unauthorized - Please login first' });
};


export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('wallet', (err: Error | null, user: AuthUser | false, info: AuthInfo) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const status = info?.status || (info?.message?.includes('not found') ? 400 : 401);
      return res.status(status).json({ error: info?.message || 'Authentication failed' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  })(req, res, next);
};

// Custom error handler for authentication
export const handleAuthError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'AuthenticationError') {
    return res.status(401).json({ error: err.message });
  }
  next(err);
};