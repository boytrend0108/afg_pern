import { USER_ROLE, User } from '../types';

export const isManagerCheck = (user: User | null): boolean => {
  if (!user) {
    return false;
  }

  return user?.roles.some((el) => el.role === USER_ROLE.MANAGER);
};
