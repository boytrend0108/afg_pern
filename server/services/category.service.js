import { Category } from '../models/models.js';

class CategoryService {
  async create({ name }) {
    const brand = await Category.create({ name });

    return brand;
  }

  async getAll() {
    return Category.findAll();
  }

  async getOne(id) {
    return Category.findByPk(id);
  }

  async remove(id) {
    return Category.destroy({ where: { id } });
  }
}

export default new CategoryService();
