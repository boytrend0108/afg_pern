import ApiError from '../exeptions/apiError.js';
import {
  Brand,
  Category,
  Favorite,
  Product,
  ProductImage,
  ProductImageInter,
  ProductInfo,
  User,
} from '../models/models.js';
import productService from './product.service.js';

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

    const response = await Favorite.findAll({
      where: { userId },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'productId'],
      },
      include: {
        model: Product,
        include: [
          {
            model: Category,
            attributes: ['name'],
          },
          {
            model: Brand,
            attributes: ['name'],
          },
          {
            model: ProductInfo,
          },
          {
            model: ProductImage,
            attributes: ['image'],
          },
          {
            model: ProductImageInter,
            attributes: ['image'],
          },
        ],
        attributes: ['id', 'title', 'price', 'year', 'hours', 'image'],
      },
    });

    const favorites = response.map((el) => {
      return {
        id: el.id,
        userId: el.userId,
        product: productService.prepareProduct(el.product),
      };
    });

    return favorites;
  }

  async remove(productId, userId) {
    await Favorite.destroy({ where: { productId, userId } });
    return { result: true, message: 'Product deleted from favorites' };
  }
}

export default new FavoriteService();
