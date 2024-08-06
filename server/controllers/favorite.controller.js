import ApiError from '../exeptions/apiError.js';
import favoriteService from '../services/favorite.service.js';

class FavoriteController {
  async add(req, res) {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      throw ApiError.BAD_REQUEST('ProductId and userId are required');
    }

    const result = await favoriteService.add(productId, userId);
    res.send(result);
  }

  async getByUserId(req, res) {
    const { userId } = req.params;

    if (!userId) {
      throw ApiError.BAD_REQUEST('User id is required');
    }

    const result = await favoriteService.getByUserId(userId);
    res.send(result);
  }

  async remove(req, res) {
    const { productId, userId } = req.params;

    if (!productId || !userId) {
      throw ApiError.BAD_REQUEST('ProductId and userId are required');
    }

    const result = await favoriteService.remove(productId, userId);
    res.send(result);
  }
}

export default new FavoriteController();
