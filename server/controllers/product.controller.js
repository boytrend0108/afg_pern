import ApiError from '../exeptions/apiError.js';
import { normalizeFields } from '../services/normalizeField.service.js';
import productService from '../services/product.service.js';
import validate from '../services/validate.service.js';

class ProductController {
  async create(req, res) {
    let product = normalizeFields(req.body);

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

    res.status(201);
    res.send(newProduct);
  }

  async getAll(req, res) {
    const products = await productService.getAll();

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
