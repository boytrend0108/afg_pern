import { Category } from '../models/models.js';

class CategoryService {
  async create({ name, image }) {
    const category = await Category.create({ name, image });

    return category;
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
