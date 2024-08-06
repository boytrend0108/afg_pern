import { useEffect, useRef, useState } from 'react';
import { ProductItem } from '../../../../entities/ProductItem';
import './ProductsSlider.scss';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import * as productItem from '../../../../entities/ProductItem';
import { PRODUT_ITEM } from '../../../../shared/consts/product';
import { useGetProductWidth } from '../../../../shared/hooks';
import { goToProductPage } from '../../../../shared/helpers/goToProductPage';
import { useNavigate } from 'react-router-dom';

export const ProductsSlider = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products } = useAppSelector((state) => state.product);
  const [itemWidth, setItemWidth] = useState(PRODUT_ITEM.WIDTH_MAX);
  const box = useRef<HTMLDivElement>(null);

  useGetProductWidth(setItemWidth);

  useEffect(() => {
    const params = new URLSearchParams();

    dispatch(productItem.getAll(params));
  }, []);

  function slide(dir: 'left' | 'right') {
    if (!box.current) {
      return;
    }

    const width = box.current.clientWidth;

    if (dir === 'left') {
      box.current.scrollLeft -= width;
    } else {
      box.current.scrollLeft += width;
    }
  }

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
            onClick={() => goToProductPage(sl, navigate, dispatch)}
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
