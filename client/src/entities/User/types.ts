/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum USER_ROLE {
  USER = 'USER',
  MANAGER = 'MANAGER',
}

export type ROLE = {
  id: number;
  role: USER_ROLE;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  name: string;
  phone: number;
  email: string;
  password: string;
  country: string;
  city: string;
  address: string;
  company: string;
  lang: string;
  roles: ROLE[];
};

export type UserCreateResponceType = {
  id: string;
  email: string;
};

export type UserLoginResponceType = {
  user: {
    id: string;
    email: string;
    name: string;
    country: string;
    city: string;
    company: string;
    lang: string;
    phone: number;
    address: string;
    roles: string[];
  };
  accessToken: string;
};

export type UserUpdateType = {
  name: string;
  phone: string | number | null;
  email: string;
  country: string;
  city: string;
  address: string;
  company: string;
  lang: string;
};

export interface RegisterErrorPayload {
  message: {
    [key: string]: string;
  };
  errors: {
    [key: string]: string;
  };
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: RegisterErrorPayload | null;
  accessToken: string | null;
}
