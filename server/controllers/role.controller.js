import ApiError from '../exeptions/apiError.js';
import { normalizeFields } from '../services/normalizeField.service.js';
import roleService from '../services/role.service.js';
import validate from '../services/validate.service.js';

class RoleController {
  async create(req, res) {
    let { role } = normalizeFields(req.body);
    const { description } = req.body;

    const errors = validate.singleField({ role });

    if (errors.role) {
      throw ApiError.BAD_REQUEST('Role is required');
    }

    const newRole = await roleService.create({ role, description });

    res.status(201);
    res.send(newRole);
  }

  async getAll(req, res) {
    const roles = await roleService.getAll();

    res.send(roles);
  }

  async getOne(req, res) {
    const { id } = req.params;

    const role = await roleService.getOne(id);

    if (!role) {
      throw ApiError.NOT_FOUND();
    }

    res.send(role);
  }

  async remove(req, res) {
    let { id } = normalizeFields(req.body);

    const errors = validate.singleField(id);

    if (errors.id) {
      throw ApiError.BAD_REQUEST('Brand id  is required');
    }

    const brand = await roleService.remove(id);

    res.send('Role has deleted');
  }
}

export default new RoleController();
