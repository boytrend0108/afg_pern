import ApiError from '../exeptions/apiError.js';
import { Favorite, Product, User } from '../models/models.js';

class FavoriteService {
  async add(productId, userId) {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
      throw ApiError.NOT_FOUND('User or product not found');
    }

    await Favorite.create({ productId, userId });
    return { result: true, message: 'Product added to favorites' };
  }

  async getByUserId(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw ApiError.NOT_FOUND('User not found');
    }

    return await Favorite.findAll({ where: { userId } });
  }

  async remove(productId, userId) {
    await Favorite.destroy({ where: { productId, userId } });
    return { result: true, message: 'Product deleted from favorites' };
  }
}

export default new FavoriteService();
