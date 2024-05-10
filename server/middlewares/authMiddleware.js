import authService from '../services/auth.service.js';

export const authMiddleware = (req, res, next) => {
  authService.checkAuth(req, res, next);

  next();
};
