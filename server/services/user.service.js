import { User } from '../models/models.js';

class userService {
  async create({ login, email, password }) {
    const user = await User.create({ login, email, password });
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}

export default new userService();
