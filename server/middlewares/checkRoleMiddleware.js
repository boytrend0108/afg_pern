import ApiError from '../exeptions/apiError.js';
import authService from '../services/auth.service.js';

export const checkRoleMiddleware = (roles) => {
  return (req, res, next) => {
    const user = authService.checkAuth(req, res, next);

    if (user.roles.some((el) => roles.includes(el.role))) {
      return next();
    }

    throw ApiError.FORBIDDEN();
  };
};
