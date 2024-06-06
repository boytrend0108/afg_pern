import { useEffect, useState } from 'react';

import './OffersTab.scss';
import { ProductItem, productAPI } from '../../../../entities/ProductItem';
import { ProductType } from '../../../../entities/ProductItem/types';
import { useAppSelector } from '../../../../shared/hooks/reduxHooks';
// eslint-disable-next-line max-len
import { getPreparedFavorites } from '../FavoriteTab/helpers/getPreparedFavorites';
import { MyLoader } from '../../../../shared/ui/MyLoader/MyLoader';

export const OffersTab = () => {
  const [booked, setBooked] = useState<Partial<ProductType>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      return;
    }

    setLoading(true);

    productAPI
      .getBooked(user.id)
      .then((res) => {
        const preparedBooked = getPreparedFavorites(res);

        setBooked(preparedBooked);
      })
      .catch((err) => setError(err.message || 'Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="OffersTab">
      <h2 className="OffersTab__title">Vehicles</h2>

      {loading && (
        <div className="FavoriteTab__loader">
          <MyLoader />
        </div>
      )}

      {error && <p className="FavoriteTab__error">{error}</p>}

      <div className="OffersTab__list">
        {booked.map((b) => (
          <div className="OffersTab__wr" key={b.id}>
            <div className="OffersTab__hover">
              <img
                src="/my-icons/booking.svg"
                alt="booked"
                width="200"
                height={200}
                className="OffersTab__img"
              />
              <p className="OffersTab__hover-title">Already booked</p>
            </div>

            <ProductItem machine={b as ProductType} />
          </div>
        ))}
      </div>
    </div>
  );
};
