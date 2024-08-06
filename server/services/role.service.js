import { Role } from '../models/models.js';

class RoleService {
  async create({ role, description }) {
    const newRole = await Role.create({ role, description });

    return newRole;
  }

  async getAll() {
    return Role.findAll();
  }

  async getOne(id) {
    return Role.findByPk(id);
  }

  async remove(id) {
    return Role.destroy({ where: { id } });
  }
}

export default new RoleService();
