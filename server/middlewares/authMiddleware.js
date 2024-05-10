import ApiError from '../exeptions/apiError.js';
import jwtService from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTION') {
    next();
  }

  const autorization = req.headers.authorization || '';
  const token = autorization.split(' ')[1];
  const user = jwtService.verifyAccess(token);

  if (!autorization || !token || !user) {
    throw ApiError.UNAUTHORIZED();
  }

  next();
};
