import ApiError from '../exeptions/apiError.js';
import basketService from '../services/basket.service.js';

class BasketController {
  async get(req, res) {
    const { userId } = req.params;
    const basket = await basketService.get(userId);

    res.send(basket);
  }

  async addItem(req, res) {
    const { productId, userId } = req.body;

    const result = await basketService.addItem(productId, userId);

    res.send(result);
  }

  async removeItem(req, res) {
    const { productId, userId } = req.body;

    const result = await basketService.removeItem(productId, userId);

    res.send(result);
  }
}

export default new BasketController();
