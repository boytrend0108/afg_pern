export type User = {
  name: string;
  phone: number;
  email: string;
  password: string;
  country: string;
  city: string;
  address: string;
  company: string;
  lang: string;
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
  };
  accessToken: string;
};

export type UserUpdateType = {
  name: string;
  phone: number;
  email: string;
  country: string;
  city: string;
  address: string;
  company: string;
  lang: string;
};

export interface RegisterErrorPayload {
  message: string;
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
