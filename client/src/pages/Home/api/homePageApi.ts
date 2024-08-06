import { httpClient } from '../../../app/configs/httpConfig';

export const leaveRequest = () => {
  return httpClient.get('/api/user');
};
