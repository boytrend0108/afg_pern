import { User } from '../../../../../entities/User/types';
import { toggleFavorite } from '../../../../../features/AddToFaforites';

type Props = {
  productId: number;
  user: User | null;
  setFavoriteWatcher: (v: boolean) => void;
  favoriteWatcher: boolean;
};

type AddToFavorite = (data: Props) => void;

export const addToFavorite: AddToFavorite = ({
  productId,
  user,
  favoriteWatcher,
  setFavoriteWatcher,
}) => {
  toggleFavorite({
    userId: user?.id || null,
    productId: productId.toString(),
  });

  setFavoriteWatcher(!favoriteWatcher); // to trace localStorage
};
