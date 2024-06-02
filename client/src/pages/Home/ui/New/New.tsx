import { useEffect, useState } from 'react';
import { ProductItem } from '../../../../entities/ProductItem';
import { MyButton } from '../../../../shared/ui';
import { ContactUs } from '../ContactUs/ContactUs';
import './New.scss';
import { useGetWidth } from '../../../../shared/hooks';
import { BREAKPOING } from '../../../../shared/consts/breakPoints';
import { useAppSelector } from '../../../../shared/hooks/reduxHooks';
import { Link } from 'react-router-dom';

export const New = () => {
  const [width, setWidth] = useState(0);
  const { products } = useAppSelector((state) => state.product);
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
  }, [width, products]);

  return (
    <div className="New">
      <div className="New__container">
        <h2 className="New__title">New</h2>

        <div className="New__row">
          {currentProd.map((item) => (
            <ProductItem key={item.id} machine={item} />
          ))}

          <ContactUs />
        </div>
      </div>

      <Link to="catalog?show=new">
        <MyButton className="MyButton New__btn">'See more'</MyButton>
      </Link>
    </div>
  );
};
