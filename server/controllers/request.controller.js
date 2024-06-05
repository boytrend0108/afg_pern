import validator from 'validator';
import { emailService } from '../services/email.service.js';
import ApiError from '../exeptions/apiError.js';

class RequestController {
  async send(req, res) {
    const userInfo = req.body;
    const { name, phone, email } = userInfo;

    if (!name || !phone || !validator.isEmail(email)) {
      throw ApiError.BAD_REQUEST('Name, phone or email are incorrect');
    }

    await emailService.sendRequestEmail(userInfo);

    res.sendStatus(200);
  }
}

export default new RequestController();
