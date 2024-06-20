import ApiError from '../exeptions/apiError.js';
import 'dotenv/config';
import sharp from 'sharp';

import { normalizeFields } from '../services/normalizeField.service.js';
import productService from '../services/product.service.js';
import validate from '../services/validate.service.js';
import { ProductInfo } from '../models/models.js';
import { googleService } from '../services/google.service.js';

class ProductController {
  async create(req, res) {
    const dto = normalizeFields(req.body);

    let { title, price, year, hours, brandId, categoryId, image, ...info } =
      dto;

    const product = {
      title,
      price,
      year,
      hours,
      brandId,
      categoryId,
      image,
    };

    const errors = validate.productDTO(product);

    if (errors.title || errors.price || errors.year || errors.hours) {
      throw ApiError.BAD_REQUEST('All fields are required', errors);
    }

    const newProduct = await productService.create(product);

    if (info) {
      Object.entries(info).forEach(([key, value]) => {
        ProductInfo.create({
          productId: newProduct.id,
          title: key,
          description: value,
        });
      });
    }

    const { images, imagesInter } = req.files;

    images.forEach(async (img, i) => {
      if (!img.mimetype.includes('image')) {
        return;
      }

      const fileName = img.name.split('.')[0] + '.webp';
      img = sharp(img.data).webp();

      const response = await googleService.uploadFile(
        fileName,
        img,
        process.env.GOOGLE_PRODUCTS_FOLDER_ID
      );

      const imageId = response.id;
      await productService.saveImage({ imageId, productId: newProduct.id });

      if (i === 0) {
        newProduct.image = imageId;

        await newProduct.save();
      }
    });

    imagesInter.forEach(async (img) => {
      if (!img.mimetype.includes('image')) {
        return;
      }

      const fileName = img.name.split('.')[0] + '.webp';
      img = sharp(img.data).webp();

      const response = await googleService.uploadFile(
        fileName,
        img,
        process.env.GOOGLE_PRODUCTS_INTER_FOLDER_ID
      );

      const imageId = response.id;
      await productService.saveImageInter({
        imageId,
        productId: newProduct.id,
      });
    });

    res.status(201);
    res.send(newProduct);
  }

  async getAll(req, res) {
    let { page, limit, ...otherQuery } = req.query;
    limit = limit || 8;
    page = page || 1;
    let offset = page * limit - limit;

    const products = await productService.getAll({
      otherQuery,
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
    let { id } = req.params;

    if (!id) {
      throw ApiError.BAD_REQUEST('Product id  is required');
    }

    const images = await productService.getImagesById(id);
    const imagesInter = await productService.getImagesInterById(id);
    const product = await productService.remove(id);

    images.forEach(async (img) => {
      await googleService.deleteFile(
        img,
        process.env.GOOGLE_PRODUCTS_FOLDER_ID
      );
    });

    imagesInter.forEach(async (img) => {
      await googleService.deleteFile(
        img,
        process.env.GOOGLE_PRODUCTS_INTER_FOLDER_ID
      );
    });

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
