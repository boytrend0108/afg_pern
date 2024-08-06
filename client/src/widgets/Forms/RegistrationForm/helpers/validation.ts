/* eslint-disable no-shadow */
import { DtoRegistration } from '../types/DtoRegistration';

export const validate = (dto: DtoRegistration) => {
  const { name, email, password, phone } = dto;

  return {
    name: !!name,
    email: !!email,
    password: !!password,
    phone: !!phone,
    country: true,
    city: true,
    company: true,
    address: true,
  };
};
