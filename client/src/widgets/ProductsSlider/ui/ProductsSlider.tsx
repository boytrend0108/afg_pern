import { useEffect, useRef, useState } from 'react';
import { ProductItem } from '../../../entities/ProductItem';
import './ProductsSlider.scss';

const slides = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const GAP = 20;
const ITEM_MAX_WIDTH = 375;

export const ProductsSlider = () => {
  const [itemWidth, setItemWidth] = useState(375);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getItemWidth = () => {
      const container = document.querySelector('.container');

      if (!container) {
        return;
      }

      const padding = window
        .getComputedStyle(container)
        .paddingInline.slice(0, -2);
      const viewport = document.body.clientWidth - 2 * +padding;
      const itemQuantity = Math.ceil(viewport / ITEM_MAX_WIDTH);

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
        className="ProductsSlider__nav--left"
        onClick={() => slide('left')}
      />
      <div className="ProductsSlider__box" ref={box}>
        {slides.map((sl) => (
          <div
            key={sl}
            className="ProductsSlider__item"
            style={{ width: itemWidth + 'px' }}
          >
            <ProductItem />
          </div>
        ))}
      </div>
      <button
        className="ProductsSlider__nav--right"
        onClick={() => slide('right')}
      />
    </section>
  );
};
