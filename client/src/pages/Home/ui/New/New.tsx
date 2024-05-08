import { useEffect, useState } from 'react';
import { ProductItem } from '../../../../entities/ProductItem';
import { MyButton } from '../../../../shared/ui';
import { ContactUs } from '../ContactUs/ContactUs';
import './New.scss';
import { useGetWidth } from '../../../../shared/hooks';
import { BREAKPOING } from '../../../../shared/consts/breakPoints';

const products = [1, 2, 3];

export const New = () => {
  const [showAll, setShowAll] = useState(false);
  const [width, setWidth] = useState(0);
  const [currentProd, setCurrentProd] = useState(products);

  useGetWidth(width, setWidth);

  useEffect(() => {
    if (width === 0) {
      return;
    }

    switch (true) {
      case width <= BREAKPOING.TABLET:
        setCurrentProd(products);
        break;

      case width <= BREAKPOING.DESKTOP_S:
        setCurrentProd(products.slice(1));
        break;

      default:
        setCurrentProd(products);
    }
  }, [width]);

  return (
    <div className="New">
      <div className="New__container">
        <h2 className="New__title">New</h2>

        <div className="New__row">
          {currentProd.map((item) => (
            <ProductItem key={item} />
          ))}

          <ContactUs />
        </div>
      </div>

      <MyButton
        className="MyButton New__btn"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'Hide' : 'See more'}
      </MyButton>
    </div>
  );
};
