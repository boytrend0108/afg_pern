import { User } from '../models/models.js';

class userService {
  async create({ login, email, password }) {
    const user = await User.create({ login, email, password });

    return this.normalize(user);
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  normalize({ id, login, email, password }) {
    return { id, login, email };
  }
}

export default new userService();
