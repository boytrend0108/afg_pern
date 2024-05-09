import ApiError from '../exeptions/apiError.js';
import CategoryService from '../services/category.service.js';
import { normalizeFields } from '../services/normalizeField.service.js';
import validate from '../services/validate.service.js';

class CategoryController {
  async create(req, res) {
    let { name } = normalizeFields(req.body);

    const errors = validate.singleField({ name });

    if (errors.name) {
      throw ApiError.BAD_REQUEST('Name is required');
    }

    const category = await CategoryService.create({ name });

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
    let { id } = normalizeFields(req.body);

    const errors = validate.singleField(id);

    if (errors.id) {
      throw ApiError.BAD_REQUEST('Category id  is required');
    }

    await CategoryService.remove(id);

    res.status(200);
    res.send('Category has deleted');
  }
}

export default new CategoryController();
