import { ProductItem } from '../../../../entities/ProductItem';
import './FavoriteTab.scss';
import { useAppSelector } from '../../../../shared/hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { getFavorite } from '../../../../features/AddToFaforites';
import { getPreparedFavorites } from './helpers/getPreparedFavorites';
import { ProductType } from '../../../../entities/ProductItem/types';
import { MyLoader } from '../../../../shared/ui/MyLoader/MyLoader';
import { PRODUT_ITEM } from '../../../../shared/consts/product';
import { useGetProductWidth } from '../../../../shared/hooks';

export const FavoriteTab = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorite, setFavorite] = useState<Partial<ProductType>[]>([]);
  const [itemWidth, setItemWidth] = useState(PRODUT_ITEM.WIDTH_MAX);

  useGetProductWidth(setItemWidth);

  useEffect(() => {
    if (user) {
      setLoading(true);
      setError('');

      getFavorite(user.id)
        .then((res) => {
          const preparedFavorite = getPreparedFavorites(res);

          setFavorite(preparedFavorite);
        })
        .catch((err) => setError(err.message || 'Something went wrong'))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="FavoriteTab">
      <h2 className="FavoriteTab__title">Favorites</h2>

      {loading && (
        <div className="FavoriteTab__loader">
          <MyLoader />
        </div>
      )}

      {error && <p className="FavoriteTab__error">{error}</p>}

      <div
        className="FavoriteTab__list"
        style={{ gridTemplateColumns: `repeat(auto-fit, ${itemWidth}px)` }}
      >
        {favorite.map((f) => (
          <div className="FavoriteTab__list-item">
            <ProductItem machine={f as ProductType} key={f.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
