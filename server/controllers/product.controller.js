import ApiError from '../exeptions/apiError.js';
import { v4 as uuidv4 } from 'uuid';

import { normalizeFields } from '../services/normalizeField.service.js';
import productService from '../services/product.service.js';
import validate from '../services/validate.service.js';
import { ProductInfo } from '../models/models.js';

class ProductController {
  async create(req, res) {
    let { title, price, year, hours, brandId, categoryId, info } =
      normalizeFields(req.body);

    const { image } = req.files;
    let fileName = uuidv4() + '.webp';
    image.mv('../server/static/products/' + fileName);

    const product = {
      title,
      price,
      year,
      hours,
      brandId,
      categoryId,
      image: fileName,
    };

    const errors = validate.productDTO(product);

    if (
      errors.title ||
      errors.price ||
      errors.year ||
      errors.hours ||
      errors.image
    ) {
      throw ApiError.BAD_REQUEST('All fields are required', errors);
    }

    const newProduct = await productService.create(product);

    if (info) {
      info = JSON.parse(info);
      info.forEach((i) => {
        ProductInfo.create({
          productId: newProduct.id,
          title: i.title,
          description: i.description,
        });
      });
    }

    res.status(201);
    res.send(newProduct);
  }

  async getAll(req, res) {
    let { brandId, categoryId, page, limit } = req.query;
    limit = limit || 8;
    page = page || 1;
    let offset = page * limit - limit;

    const products = await productService.getAll({
      brandId,
      categoryId,
      limit,
      offset,
    });

    res.send(products);
  }

  async getOne(req, res) {
    const { id } = req.params;

    const product = await productService.getOne(id);

    if (!product) {
      throw ApiError.NOT_FOUND();
    }

    res.send(product);
  }

  async remove(req, res) {
    let { id } = normalizeFields(req.body);

    const errors = validate.singleField(id);

    if (errors.id) {
      throw ApiError.BAD_REQUEST('Product id  is required');
    }

    const product = await productService.remove(id);

    res.send('Product has deleted');
  }

  async update(req, res) {
    const { id, ...toUpdate } = req.body;
    const product = await productService.getOne(id);

    if (!product) {
      throw ApiError.BAD_REQUEST('Product not found');
    }

    await productService.update(id, toUpdate);

    res.status(200);
    res.send('Product updated');
  }
}

export default new ProductController();
