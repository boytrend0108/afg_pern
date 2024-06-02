import { Fragment } from 'react/jsx-runtime';
import { ProductItem } from '../../../../entities/ProductItem';
import './FavoriteTab.scss';

const favorite = [];

export const FavoriteTab = () => {
  return (
    <div className="FavoriteTab">
      <h2 className="FavoriteTab__title">Favorites</h2>

      <div className="FavoriteTab__list">
        {favorite.map((f) => (
          <Fragment key={f}>
            <ProductItem />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
