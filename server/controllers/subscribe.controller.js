import validator from 'validator';
import ApiError from '../exeptions/apiError.js';
import subscribeService from '../services/subscribe.service.js';

class SubscribeController {
  async subscribe(req, res) {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      throw ApiError.BAD_REQUEST('The email is incorrect');
    }

    await subscribeService.save(email);

    res.sendStatus(200);
  }

  async unsubscribe(req, res) {
    const { email } = req.params;

    if (!validator.isEmail(email)) {
      throw ApiError.BAD_REQUEST('The email is incorrect');
    }

    await subscribeService.delete(email);

    res.sendStatus(200);
  }

  async getAll(req, res) {
    const subscribers = await subscribeService.getAll();

    res.send(subscribers);
  }
}

export default new SubscribeController();
