import { Category, Product } from '../models/models.js';
import { sequelize } from '../db/db.js';

class CategoryService {
  async create({ name, image }) {
    const category = await Category.create({ name, image });

    return category;
  }

  async getAll() {
    const categories = await Category.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM "products" WHERE "products"."categoryId" = "category"."id")`
            ),
            'productCount',
          ],
        ],
      },
    });

    return categories;
  }

  async getOne(id) {
    return Category.findByPk(id);
  }

  async remove(id) {
    return Category.destroy({ where: { id } });
  }
}

export default new CategoryService();
