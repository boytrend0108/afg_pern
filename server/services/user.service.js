import { sequelize } from '../db/db.js';
import ApiError from '../exeptions/apiError.js';
import {
  Basket,
  Favorite,
  Order,
  Refresh,
  Reserve,
  Role,
  User,
} from '../models/models.js';
import basketService from './basket.service.js';

class userService {
  async create(userDto) {
    const user = await User.create(userDto);
    await basketService.create(user.id);

    const defaultRole = await Role.findOne({ where: { role: 'USER' } });
    if (defaultRole) {
      await user.addRole(defaultRole);
    } else {
      throw new Error('Default role not found');
    }

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

  async findByActivationToken(activationToken) {
    const user = await User.findOne({
      where: { activationToken },
    });

    return user;
  }

  async findById(id) {
    const user = await User.findByPk(id, {
      include: [Role],
    });

    return user;
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

  async remove(id) {
    const transaction = await sequelize.transaction();

    try {
      await Favorite.destroy({ where: { userId: id }, transaction });
      await Order.destroy({ where: { userId: id }, transaction });
      await Reserve.destroy({ where: { userId: id }, transaction });
      await Basket.destroy({ where: { userId: id }, transaction });
      await Refresh.destroy({ where: { userId: id }, transaction });

      await User.destroy({ where: { id }, transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw ApiError.FORBIDDEN('Failed transaction whet delete user');
    }
  }

  normalize({
    id,
    name,
    email,
    roles,
    country,
    city,
    address,
    company,
    phone,
    lang,
  }) {
    return {
      id,
      name,
      email,
      roles,
      country,
      city,
      address,
      company,
      phone,
      lang,
    };
  }
}

export default new userService();
