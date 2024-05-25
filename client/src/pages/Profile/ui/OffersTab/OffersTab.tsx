import { ProductItem } from '../../../../entities/ProductItem';
import './OffersTab.scss';

const favorite = [1, 2, 3, 4, 5];

export const OffersTab = () => {
  return (
    <div className="OffersTab">
      <h2 className="OffersTab__title">Favorites</h2>

      <div className="OffersTab__list">
        {favorite.map((f) => (
          <div className="OffersTab__wr" key={f}>
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
            <ProductItem />
          </div>
        ))}
      </div>
    </div>
  );
};
