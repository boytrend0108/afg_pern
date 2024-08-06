import ApiError from '../exeptions/apiError.js';
import jwtService from './jwt.service.js';

class authService {
  checkAuth(req, res, next) {
    if (req.method === 'OPTION') {
      next();
    }

    const autorization = req.headers['authorization'] || '';
    const [, token] = autorization.split(' ');
    const user = jwtService.verifyAccess(token);

    if (!autorization || !token || !user) {
      throw ApiError.UNAUTHORIZED();
    }

    return user;
  }
}

export default new authService();
