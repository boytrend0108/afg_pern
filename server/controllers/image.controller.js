import ApiError from '../exeptions/apiError.js';
import axios from 'axios';

class ImageController {
  async get(req, res) {
    const { id } = req.query;

    if (!id) {
      throw ApiError.BAD_REQUEST('Undefined image id');
    }

    const url = `https://drive.google.com/thumbnail?id=${id}&sz=w760&sz=h570`;

    const response = await axios.get(url, { responseType: 'stream' });
    response.data.pipe(res);
  }
}

export default new ImageController();
