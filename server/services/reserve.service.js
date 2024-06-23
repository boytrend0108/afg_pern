import ApiError from '../exeptions/apiError.js';
import {
  Reserve,
  Product,
  User,
  Category,
  Brand,
  ProductInfo,
  ProductImage,
  ProductImageInter,
} from '../models/models.js';
import productService from './product.service.js';

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

  async getByUserId(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw ApiError.NOT_FOUND('User not found');
    }

    const response = await Reserve.findAll({
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

    const booked = response.map((el) => {
      return {
        id: el.id,
        userId: el.userId,
        product: productService.prepareProduct(el.product),
      };
    });

    return booked;
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
}

export default new ReserveService();
