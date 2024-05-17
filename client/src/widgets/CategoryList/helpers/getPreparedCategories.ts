import { CategoryType } from '../../../shared/types/category';

export const getPreparedCategories = (
  categories: CategoryType[],
  currentWidth: number,
): CategoryType[] => {
  switch (true) {
    case currentWidth <= 425:
      return categories.slice(0, 2);

    case currentWidth <= 1024:
      return categories.slice(0, 8);

    default:
      return categories;
  }
};
