import ApiError from '../exeptions/apiError.js';
import { Reserve, Product, User } from '../models/models.js';

class ReserveService {
  async add({ productId, userId }) {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
      throw ApiError.NOT_FOUND('User or Product not found');
    }

    const existingProduct = await Reserve.findOne({
      where: { productId, userId },
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
      await existingProduct.save();
      return {
        result: true,
        message: 'The quantity of goods has been increased',
      };
    }

    await Reserve.create({ productId, userId });

    return { result: true, message: 'Product reserved' };
  }

  async delete({ productId, userId }) {
    const reserve = await Reserve.findOne({ where: { productId, userId } });

    if (!reserve) {
      throw ApiError.NOT_FOUND(
        'Reserve for the specified product and user not found'
      );
    }

    if (reserve.quantity > 1) {
      reserve.quantity -= 1;
      await reserve.save();
      return {
        result: true,
        message: 'The quantity of goods has been reduced',
      };
    }

    await reserve.destroy();
    return {
      result: true,
      message: 'Reserve deleted',
    };
  }

  async getAll(userId) {
    return await Reserve.findAll({ where: { userId } });
  }
}

export default new ReserveService();
