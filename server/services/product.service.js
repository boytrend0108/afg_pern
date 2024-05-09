import { Product } from '../models/models.js';

class ProductService {
  async create(product) {
    const newProduct = await Product.create(product);

    return newProduct;
  }

  async getAll() {
    return Product.findAll();
  }

  async getOne(id) {
    return Product.findByPk(id);
  }

  async remove(id) {
    return Product.destroy({ where: { id } });
  }

  async update(id, toUpdate) {
    return await Product.update(toUpdate, {
      where: {
        id,
      },
    });
  }
}

export default new ProductService();
