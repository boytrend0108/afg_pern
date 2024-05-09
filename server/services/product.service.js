import { Product } from '../models/models.js';

class ProductService {
  async create(product) {
    const newProduct = await Product.create(product);

    return newProduct;
  }

  async getAll({ brandId, categoryId, limit, offset }) {
    let products;

    if (!brandId && !categoryId) {
      products = await Product.findAndCountAll({ limit, offset });
    }

    if (brandId && !categoryId) {
      products = await Product.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }

    if (!brandId && categoryId) {
      products = await Product.findAndCountAll({
        where: { categoryId },
        limit,
        offset,
      });
    }

    if (brandId && categoryId) {
      products = await Product.findAndCountAll({
        where: { categoryId, brandId },
        limit,
        offset,
      });
    }

    return products;
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
