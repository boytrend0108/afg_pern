import ApiError from '../exeptions/apiError.js';
import BrandService from '../services/brand.service.js';
import { normalizeFields } from '../services/normalizeField.service.js';
import validate from '../services/validate.service.js';

class BrandController {
  async create(req, res) {
    let { name } = normalizeFields(req.body);

    const errors = validate.singleField({ name });

    if (errors.name) {
      throw ApiError.BAD_REQUEST('Name is required');
    }

    const brand = await BrandService.create({ name });

    res.status(201);
    res.send(brand);
  }

  async getAll(req, res) {
    const brands = await BrandService.getAll();

    res.send(brands);
  }

  async getOne(req, res) {
    const { id } = req.params;

    const brand = await BrandService.getOne(id);
    if (!brand) {
      throw ApiError.NOT_FOUND();
    }

    res.send(brand);
  }

  async remove(req, res) {
    let { id } = normalizeFields(req.params);

    const errors = validate.singleField(id);

    if (errors.id) {
      throw ApiError.BAD_REQUEST('Brand id  is required');
    }

    const brand = await BrandService.remove(id);

    res.send('Brand has deleted');
  }
}

export default new BrandController();
