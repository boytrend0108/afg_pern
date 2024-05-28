import authService from '../services/auth.service.js';

export const authMiddleware = (req, res, next) => {
  const user = authService.checkAuth(req, res, next);
  req.user = user;
  next();
};
