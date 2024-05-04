import { useEffect, useState } from 'react';
import { ProductItem } from '../../../../entities/ProductItem';
import { MyButton } from '../../../../shared/ui';
// import { ContactUs } from '../ContactUs/ContactUs';
import './New.scss';
import { getPreparedCards } from './helpers/getPreparedCards';

const products = [1, 2, 3, 4, 5, 6];

export const New = () => {
  const [showAll, setShowAll] = useState(false);
  // eslint-disable-next-line prefer-const
  let [slicedProducts, setSlicedProducts] = useState<number[]>([]);

  slicedProducts = showAll ? products : slicedProducts;
  console.log(slicedProducts.length);

  useEffect(() => {
    const sliceList = () => {
      const p = getPreparedCards(products, window.innerWidth);

      setSlicedProducts(p);
    };

    sliceList();

    window.addEventListener('resize', sliceList);

    return () => {
      window.removeEventListener('resize', sliceList);
    };
  }, []);

  return (
    <div className="New">
      <div className="New__container">
        <h2 className="New__title">New</h2>

        <div className="New__row">
          {slicedProducts.map((item) => (
            <ProductItem key={item} />
          ))}

          {/* <ContactUs /> */}
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
