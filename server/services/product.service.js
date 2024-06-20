import {
  Brand,
  Category,
  Product,
  ProductImageInter,
  ProductInfo,
} from '../models/models.js';
import { ProductImage } from '../models/models.js';
import { Op } from 'sequelize';
const MAX_FILTER_VALUE = 300000;

class ProductService {
  async create(product) {
    const newProduct = await Product.create(product);

    return newProduct;
  }

  async getAll({ otherQuery, limit, offset }) {
    let response;
    const {
      brandId,
      categoryId,
      'price-min': priceMin,
      'price-max': priceMax,
      'year-max': yearMax,
      'year-min': yearMin,
      'hours-max': hoursMax,
      'hours-min': hoursMin,
    } = otherQuery;

    const whereClause = {};

    if (brandId) whereClause.brandId = brandId;
    if (categoryId) whereClause.categoryId = categoryId;

    if (priceMax && priceMin) {
      whereClause.price = { [Op.between]: [priceMin, priceMax] };
    }

    if (priceMax && !priceMin) {
      whereClause.price = { [Op.between]: [0, priceMax] };
    }

    if (!priceMax && priceMin) {
      whereClause.price = { [Op.between]: [priceMin, MAX_FILTER_VALUE] };
    }

    if (yearMax && yearMin) {
      whereClause.price = { [Op.between]: [yearMin, yearMax] };
    }

    if (yearMax && !yearMin) {
      whereClause.price = { [Op.between]: [0, yearMax] };
    }

    if (!yearMax && yearMin) {
      whereClause.price = { [Op.between]: [yearMin, MAX_FILTER_VALUE] };
    }

    if (hoursMax && hoursMin) {
      whereClause.price = { [Op.between]: [hoursMin, hoursMax] };
    }

    if (hoursMax && !hoursMin) {
      whereClause.price = { [Op.between]: [0, hoursMax] };
    }

    if (!hoursMax && hoursMin) {
      whereClause.price = { [Op.between]: [hoursMin, MAX_FILTER_VALUE] };
    }

    const count = await Product.count({ where: whereClause });

    response = await Product.findAll({
      where: whereClause,
      limit,
      offset,
      include: [
        {
          model: ProductImage,
          attributes: ['image'],
        },
        {
          model: ProductImageInter,
          attributes: ['image'],
        },
        {
          model: ProductInfo,
          attributes: ['title', 'description'],
        },
        {
          model: Brand,
          attributes: ['name', 'id'],
        },
        {
          model: Category,
          attributes: ['name', 'id'],
        },
      ],
    });

    response.products = this.prepareProduct(response);

    return {
      count,
      products: response.products,
    };
  }

  async getOne(id) {
    let response = await Product.findByPk(id, {
      include: [
        {
          model: ProductImage,
          attributes: ['image'],
        },
        {
          model: ProductImageInter,
          attributes: ['image'],
        },
        {
          model: ProductInfo,
          attributes: ['title', 'description'],
        },
        {
          model: Brand,
          attributes: ['name'],
        },
        {
          model: Category,
          attributes: ['name'],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    return this.prepareProduct(response);
  }

  async remove(id) {
    return Product.destroy({ where: { id } });
  }

  async update(id, toUpdate) {
    return await Product.update(toUpdate, {
      where: {
        id,
      },
    });
  }

  async saveImage({ imageId, productId }) {
    await ProductImage.create({ image: imageId, productId });
  }

  async saveImageInter({ imageId, productId }) {
    await ProductImageInter.create({ image: imageId, productId });
  }

  async getImagesById(productId) {
    const images = await ProductImage.findAll({
      where: { productId },
      attributes: ['image'],
    });

    const imageUrls = images.map((image) => image.image);
    return imageUrls;
  }

  async getImagesInterById(productId) {
    const images = await ProductImageInter.findAll({
      where: { productId },
      attributes: ['image'],
    });

    const imageUrls = images.map((image) => image.image);
    return imageUrls;
  }

  prepareProduct(response) {
    if (Array.isArray(response)) {
      return response.map((product) => {
        return {
          ...product.dataValues,
          product_images: product.product_images.map((image) => image.image),
          product_image_inters: product.product_image_inters.map(
            (image) => image.image
          ),
          brand: product.brand.name,
          category: product.category.name,
        };
      });
    }

    const product = {
      ...response.dataValues,
      product_images: response.product_images.map((image) => image.image),
      product_image_inters: response.product_image_inters.map(
        (image) => image.image
      ),
      brand: response.brand.name,
      category: response.category.name,
    };

    return product;
  }
}

export default new ProductService();
