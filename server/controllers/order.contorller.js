import ApiError from '../exeptions/apiError.js';
import orderService from '../services/order.service.js';

class OrderController {
  async add(req, res) {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      throw ApiError.BAD_REQUEST('OrderId and userId are required');
    }

    const result = await orderService.add({ productId, userId });

    res.send(result);
  }

  async delete(req, res) {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      throw ApiError.BAD_REQUEST('OrderId and userId are required');
    }

    const result = await orderService.delete({ productId, userId });

    res.send(result);
  }

  async getAll(req, res) {
    const { userId } = req.params;

    if (!userId) {
      throw ApiError.BAD_REQUEST('User id is required');
    }

    const result = await orderService.getAll(userId);

    res.send(result);
  }
}

export default new OrderController();
