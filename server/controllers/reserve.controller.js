import ApiError from '../exeptions/apiError.js';
import reserveService from '../services/reserve.service.js';
import productService from '../services/product.service.js';
import { emailService } from '../services/email.service.js';

class ReserveController {
  async add(req, res) {
    const { productId, userId, ...userInfo } = req.body;

    if (!productId) {
      throw ApiError.BAD_REQUEST('ProduId are required');
    }

    if (userId) {
      const result = await reserveService.add({ productId, userId });
    }

    const product = await productService.getOne(productId);
    await emailService.sendReserveEmail({ userInfo, product });

    res.send(200);
  }

  async delete(req, res) {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      throw ApiError.BAD_REQUEST('OrderId and userId are required');
    }

    const result = await reserveService.delete({ productId, userId });

    res.send(result);
  }

  async getAll(req, res) {
    const { userId } = req.params;

    if (!userId) {
      throw ApiError.BAD_REQUEST('User id is required');
    }

    const result = await reserveService.getByUserId(userId);

    res.send(result);
  }
}

export default new ReserveController();
