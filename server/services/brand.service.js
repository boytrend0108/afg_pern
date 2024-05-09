import { Brand } from '../models/models.js';

class BrandService {
  async create({ name }) {
    const brand = await Brand.create({ name });

    return brand;
  }

  async getAll() {
    return Brand.findAll();
  }

  async getOne(id) {
    return Brand.findByPk(id);
  }

  async remove(id) {
    return Brand.destroy({ where: { id } });
  }
}

export default new BrandService();
