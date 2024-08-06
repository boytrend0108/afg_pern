import { sequelize } from '../db/db.js';
import ApiError from '../exeptions/apiError.js';
import { Basket, BasketProduct, Product } from '../models/models.js';

class BasketService {
  async create(userId) {
    await Basket.create({ userId });

    return { result: true, message: 'Basket created' };
  }

  async get(userId) {
    const basket = await Basket.findOne({ where: { userId } });

    if (!basket) {
      throw ApiError.NOT_FOUND('Basket not found');
    }

    const basketProducts = await BasketProduct.findAll({
      where: { basketId: basket.id },
    });

    return basketProducts;
  }

  async addItem(productId, userId) {
    const basket = await Basket.findOne({ where: { userId } });
    const product = await Product.findByPk(productId);

    if (!basket || !product) {
      throw ApiError.NOT_FOUND('Basket or Product not found');
    }

    const existingProduct = await basket.hasProduct(product);

    if (existingProduct) {
      await basket.addProduct(product, {
        through: { amount: sequelize.literal('amount + 1') },
      });

      return { result: true, message: 'Amount of products increased' };
    }

    await basket.addProduct(product);
    return { result: true, message: 'Product added to basket' };
  }

  async removeItem(productId, userId) {
    const basket = await Basket.findOne({ where: { userId } });
    const product = await Product.findByPk(productId);

    if (!basket || !product) {
      throw ApiError.NOT_FOUND('Basket or Product not found');
    }

    const existingProduct = await BasketProduct.findOne({
      where: { productId, basketId: basket.id },
    });

    if (!existingProduct) {
      return { result: false, message: 'Product not found in this basket' };
    }

    if (existingProduct && existingProduct.amount > 1) {
      existingProduct.amount -= 1;
      await existingProduct.save();

      return { result: true, message: 'Quantity of goods reduced' };
    }

    await BasketProduct.destroy({ where: { productId, basketId: basket.id } });

    return { result: true, message: 'Product removed from basket' };
  }
}

export default new BasketService();
