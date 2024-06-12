import userService from '../services/user.service.js';
import ApiError from '../exeptions/apiError.js';
import validate from '../services/validate.service.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import jwtService from '../services/jwt.service.js';
import { normalizeFields } from '../services/normalizeField.service.js';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/email.service.js';

class UserController {
  async register(req, res) {
    let { name, email, password, phone, country, city, address, company } =
      normalizeFields(req.body);

    const errors = validate.registrationTDO({
      name,
      email,
      password,
      phone,
      country,
      city,
      address,
      company,
    });

    if (errors.name || errors.password || errors.email || errors.phone) {
      throw ApiError.BAD_REQUEST('Bad request', errors);
    }

    const candidate = await userService.findByEmail(email);

    if (candidate) {
      throw ApiError.BAD_REQUEST('A user with the same email already exists');
    }

    const hash = await bcrypt.hash(password, 5);
    const activationToken = uuidv4();
    const user = await userService.create({
      name,
      email,
      password: hash,
      phone,
      country,
      city,
      address,
      company,
      activationToken,
    });

    await emailService.sendActivationEmail({ email, token: activationToken });

    res.status(201);
    res.send(user);
  }

  async activate(req, res) {
    const { activationToken } = req.params;

    const user = await userService.findByActivationToken(activationToken);

    if (!user) {
      throw ApiError.NOT_FOUND('User not found');
    }

    user.activationToken = null;
    await user.save();

    res.send(200);
  }

  async login(req, res) {
    let { email, password } = normalizeFields(req.body);
    const errors = validate.loginTDO({ email, password });

    if (errors.password || errors.email) {
      throw ApiError.BAD_REQUEST('Emaii or password are incorrect', errors);
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
    const user = jwtService.verifyRefresh(refreshToken);

    if (!user || !refreshToken) {
      throw ApiError.UNAUTHORIZED();
    }

    await jwtService.remove(user.id);
    res.sendStatus(204);
  }

  async refresh(req, res) {
    const { refreshToken } = req.cookies;

    const user = jwtService.verifyRefresh(refreshToken);
    const token = await jwtService.getByToken(refreshToken);

    if (!user || !token) {
      throw ApiError.BAD_REQUEST('Session expired');
    }

    jwtService.generateTokens(res, user);
  }

  async update(req, res) {
    let { name, email, phone, country, city, address, company, lang, id } =
      normalizeFields(req.body);

    const errors = validate.updateUserTDO({
      name,
      email,
      phone,
    });

    if (errors.name || errors.email || errors.phone) {
      throw ApiError.BAD_REQUEST('Bad request', errors);
    }

    const user = await userService.findById(id);

    if (!user) {
      throw ApiError.BAD_REQUEST('A user with this email not found');
    }

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.company = company;
    user.city = city;
    user.country = country;
    user.address = address;
    user.lang = lang;

    await user.save();

    res.status(200);
    res.send(userService.normalize(user));
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

  async check(req, res) {
    const { id } = req.user;
    const user = await userService.findById(id);
    jwtService.generateTokens(res, user);
  }

  async remove(req, res) {
    const { id } = req.params;
    await userService.remove(id);
    res.sendStatus(204);
  }
}

export default new UserController();
