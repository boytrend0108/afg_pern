import userService from '../services/user.service.js';
import ApiError from '../exeptions/apiError.js';
import validate from '../services/validate.service.js';
import bcrypt from 'bcrypt';
import 'dotenv/config';

class UserController {
  register = async (req, res) => {
    const { login, email, password } = req.body;

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

    res.send(user);
  };
}

export default new UserController();
