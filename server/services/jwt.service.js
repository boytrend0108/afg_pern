import jwt from 'jsonwebtoken';
import 'dotenv';

import { Refrefh } from '../models/models.js';
import userService from './user.service.js';

class JwtService {
  signAccess(user) {
    return jwt.sign(user, process.env.JWT_KEY, { expiresIn: '24h' });
  }

  verifyAccess(token) {
    try {
      return jwt.verify(token, process.env.JWT_KEY);
    } catch (e) {
      return null;
    }
  }

  signRefresh(user) {
    return jwt.sign(user, process.env.JWT_REFRESH_KEY);
  }

  verifyRefresh(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_KEY);
    } catch (e) {
      return null;
    }
  }

  async save(newToken, userId) {
    const token = await Refrefh.findOne({ where: { userId } });

    if (!token) {
      await Refrefh.create({ refresh: newToken, userId });
      return;
    }

    token.refresh = newToken;
    await token.save();
  }

  async remove(userId) {
    await Refrefh.destroy({ where: { userId } });
  }

  async generateTokens(res, user) {
    const normalizedUser = userService.normalize(user);
    const accessToken = this.signAccess(normalizedUser);
    const refreshToken = this.signRefresh(normalizedUser);

    await this.save(refreshToken, normalizedUser.id);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    res.status(200);
    res.send({ user: normalizedUser, accessToken });
  }
}

export default new JwtService();
