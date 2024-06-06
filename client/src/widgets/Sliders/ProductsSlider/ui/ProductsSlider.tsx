import { useEffect, useRef, useState } from 'react';
import { ProductItem } from '../../../../entities/ProductItem';
import './ProductsSlider.scss';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import * as productItem from '../../../../entities/ProductItem';

const GAP = 20;
const ITEM_MAX_WIDTH = 375;
const ITEM_MIN_WIDTH = 215;

export const ProductsSlider = () => {
  const [itemWidth, setItemWidth] = useState(375);
  const box = useRef<HTMLDivElement>(null);
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productItem.getAll());
  }, []);

  useEffect(() => {
    const getItemWidth = () => {
      const container = document.querySelector('.my-container');

      if (!container) {
        return;
      }

      const padding = window
        .getComputedStyle(container)
        .paddingInline.slice(0, -2);
      const viewport = document.body.clientWidth - 2 * +padding;

      let itemQuantity = Math.ceil(viewport / ITEM_MAX_WIDTH);

      const width = (viewport - (itemQuantity - 1) * GAP) / itemQuantity;

      if (width < ITEM_MIN_WIDTH) {
        itemQuantity--;
      }

      setItemWidth((viewport - (itemQuantity - 1) * GAP) / itemQuantity);
    };

    getItemWidth();

    window.addEventListener('resize', getItemWidth);

    return () => {
      window.removeEventListener('resize', getItemWidth);
    };
  }, []);

  const slide = (dir: 'left' | 'right') => {
    if (!box.current) {
      return;
    }

    const width = box.current.clientWidth;

    if (dir === 'left') {
      box.current.scrollLeft -= width;
    } else {
      box.current.scrollLeft += width;
    }
  };

  return (
    <section className="ProductsSlider">
      <button
        data-button
        className="ProductsSlider__nav--left"
        onClick={() => slide('left')}
      />
      <div className="ProductsSlider__box" ref={box}>
        {products.map((sl) => (
          <div
            key={sl.id}
            className="ProductsSlider__item"
            style={{ width: itemWidth + 'px' }}
          >
            <ProductItem machine={sl} />
          </div>
        ))}
      </div>
      <button
        data-button
        className="ProductsSlider__nav--right"
        onClick={() => slide('right')}
      />
    </section>
  );
};
