import userService from '../services/user.service.js';
import ApiError from '../exeptions/apiError.js';
import validate from '../services/validate.service.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import jwtService from '../services/jwt.service.js';
import { normalizeFields } from '../services/normalizeField.service.js';

class UserController {
  async register(req, res) {
    let { login, email, password } = normalizeFields(req.body);
    const errors = validate.registrationTDO({ login, email, password });

    if (errors.login || errors.password || errors.email) {
      throw ApiError.BAD_REQUEST('Bad request', errors);
    }

    const candidate = await userService.findByEmail(email);

    if (candidate) {
      throw ApiError.BAD_REQUEST('A user with the same email already exists');
    }

    const hash = await bcrypt.hash(password, 5);
    const user = await userService.create({ login, email, password: hash });

    const accessToken = jwtService.signAccess(user);
    const refreshToken = jwtService.signRefresh(user);

    await jwtService.save(refreshToken, user.id);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.status(201);
    res.send({ user, accessToken });
  }

  async login(req, res) {
    let { email, password } = normalizeFields(req.body);
    const errors = validate.loginTDO({ email, password });

    if (errors.password || errors.email) {
      throw ApiError.BAD_REQUEST('Bad request', errors);
    }

    const user = await userService.findByEmail(email);

    if (!user) {
      throw ApiError.BAD_REQUEST('Emaii or password are wrong');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw ApiError.BAD_REQUEST('Emaii or password are wrong');
    }

    jwtService.generateTokens(res, user);
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw ApiError.UNAUTHORIZED();
    }

    const user = jwtService.verifyRefresh(refreshToken);

    if (!user) {
      throw ApiError.UNAUTHORIZED();
    }

    await jwtService.remove(user.id);
    res.sendStatus(204);
  }

  async getAll(req, res) {
    const users = await userService.getAll();

    res.send(users);
  }

  async getById(req, res) {
    const { id } = req.params;
    const user = await userService.findById(id);

    if (!user) {
      throw ApiError.NOT_FOUND('User not found');
    }

    res.send(user);
  }

  async addRole(req, res) {
    const { userId, role } = req.body;

    const result = await userService.addRole(userId, role);

    res.send(result);
  }

  async deleteRole(req, res) {
    const { userId, role } = req.body;

    const result = await userService.deleteRole(userId, role);

    res.send(result);
  }
}

export default new UserController();
