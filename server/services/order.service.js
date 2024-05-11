import ApiError from '../exeptions/apiError.js';
import { Order, Product, User } from '../models/models.js';

class OrderService {
  async add({ productId, userId }) {
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
      throw ApiError.NOT_FOUND('User or Product not found');
    }

    const existingProduct = await Order.findOne({
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

    await user.addProduct(product);

    return { result: true, message: 'Product ordered' };
  }

  async delete({ productId, userId }) {
    const order = await Order.findOne({ where: { productId, userId } });

    if (!order) {
      throw ApiError.NOT_FOUND(
        'Order for the specified product and user not found'
      );
    }

    if (order.quantity > 1) {
      order.quantity -= 1;
      await order.save();
      return {
        result: true,
        message: 'The quantity of goods has been reduced',
      };
    }

    await order.destroy();
    return {
      result: true,
      message: 'Order deleted',
    };
  }

  async getAll(userId) {
    return await Order.findAll({ where: { userId } });
  }
}

export default new OrderService();
