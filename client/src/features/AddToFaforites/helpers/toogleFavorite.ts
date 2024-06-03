import localStorageService from '../../../shared/services/localStorageService';
import { addFavorite, deleteFavorite } from '../api';

type Props = {
  productId: string;
  userId: number | null;
  setIsFavorite?: (v: boolean) => void;
};

export const toggleFavorite = (data: Props) => {
  const { productId, userId, setIsFavorite } = data;

  if (!productId) {
    return;
  }

  let favorite: string[] = localStorageService.get('favorite') || [];

  if (favorite.includes(productId)) {
    favorite = favorite.filter((el) => el !== productId);

    if (setIsFavorite) {
      setIsFavorite(false);
    }

    if (userId) {
      deleteFavorite({ productId: +productId, userId });
    }
  } else {
    favorite.push(productId);

    if (setIsFavorite) {
      setIsFavorite(true);
    }

    if (userId) {
      addFavorite({ productId: +productId, userId });
    }
  }

  localStorageService.set('favorite', favorite);
};
