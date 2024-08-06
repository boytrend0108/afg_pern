/* eslint-disable no-shadow */
import { DtoLogin } from '../types/DtoLogin';

export const validate = (dto: DtoLogin) => {
  const { email, password } = dto;

  return {
    email: !!email,
    password: !!password,
  };
};
