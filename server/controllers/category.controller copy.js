import sharp from 'sharp';
import 'dotenv/config';

import ApiError from '../exeptions/apiError.js';
import CategoryService from '../services/category.service.js';
import { normalizeFields } from '../services/normalizeField.service.js';
import validate from '../services/validate.service.js';
import { googleService } from '../services/google.service.js';

class CategoryController {
  async create(req, res) {
    let { name } = normalizeFields(req.body);
    const errors = validate.singleField({ name });

    if (errors.name) {
      throw ApiError.BAD_REQUEST('Name is required');
    }

    let { image } = req.files;

    if (!image) {
      throw ApiError.BAD_REQUEST('Image is required');
    }

    const fileName = image.name.split('.')[0] + '.webp';
    image = sharp(image.data).webp();

    const response = await googleService.uploadFile(
      fileName,
      image,
      process.env.GOOGLE_CATEGORY_FOLDER_ID
    );
    const imageId = response.id;

    const category = await CategoryService.create({ name, image: imageId });

    res.status(201);
    res.send(category);
  }

  async getAll(req, res) {
    const categories = await CategoryService.getAll();

    res.send(categories);
  }

  async getOne(req, res) {
    const { id } = req.params;

    const category = await CategoryService.getOne(id);
    if (!category) {
      throw ApiError.NOT_FOUND();
    }

    res.send(category);
  }

  async remove(req, res) {
    let { id, imageId } = normalizeFields(req.params);

    const errors = validate.singleField(id);

    if (errors.id) {
      throw ApiError.BAD_REQUEST('Category id  is required');
    }

    await CategoryService.remove(id);
    await googleService.deleteFile(
      imageId,
      process.env.GOOGLE_CATEGORY_FOLDER_ID
    );

    res.status(200);
    res.send('Category has deleted');
  }
}

export default new CategoryController();
