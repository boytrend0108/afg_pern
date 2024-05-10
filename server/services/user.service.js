import ApiError from '../exeptions/apiError.js';
import { Basket, Role, User } from '../models/models.js';

class userService {
  async create({ login, email, password }) {
    const user = await User.create({ login, email, password });
    const basket = await Basket.create({ userId: user.id });

    const defaultRole = await Role.findByPk(1); // default value USER
    if (defaultRole) {
      await user.addRole(defaultRole);
    } else {
      throw new Error('Default role not found');
    }
    // Add more roles to the user if needed
    // await user.addRole(anotherRole);

    return this.normalize(user);
  }

  async getAll() {
    const users = await User.findAll({ include: [Role] });

    return users.map((user) => this.normalize(user));
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: { email },
      include: [Role],
    });

    return user;
  }

  async findById(id) {
    const user = await User.findByPk(id, {
      include: [Role],
    });

    return this.normalize(user);
  }

  async addRole(userId, roleName) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw ApiError.NOT_FOUND('User not found');
    }

    const role = await Role.findOne({ where: { role: roleName } });

    if (!role) {
      throw ApiError.NOT_FOUND('Role not found');
    }

    await user.addRole(role);
    await user.save();

    return { success: true, message: 'Role added successfully' };
  }

  async deleteRole(userId, roleName) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw ApiError.NOT_FOUND('User not found');
    }

    const role = await Role.findOne({ where: { role: roleName } });

    if (!role) {
      throw ApiError.NOT_FOUND('Role not found');
    }

    await user.removeRole(role);
    await user.save();

    return { success: true, message: `Role deleted successfully` };
  }

  normalize({ id, login, email, password, roles }) {
    return { id, login, email, roles };
  }
}

export default new userService();
