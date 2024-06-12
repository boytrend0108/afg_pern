import ApiError from '../exeptions/apiError.js';
import { Subscribe } from '../models/models.js';

class SubscribeService {
  async save(email) {
    return Subscribe.create({ email });
  }

  async delete(email) {
    const isEmail = Subscribe.findOne({ where: { email } });

    if (!isEmail) {
      throw ApiError.NOT_FOUND('Email not found');
    }

    return Subscribe.destroy({ where: { email } });
  }

  async getAll() {
    return Subscribe.findAll();
  }
}

export default new SubscribeService();
