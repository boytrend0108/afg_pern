import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './ProductItem.scss';
import { ProductType, PromoType } from '../types';
import { ARTICUL_PREFIX } from '../../../shared/consts/product';
import { GOOGLE_DRIVE_URL } from '../../../shared/consts/google';
// eslint-disable-next-line max-len
import { getPromoType } from '../../../pages/ProductPage/helpers.ts/getPromoType';

type Props = {
  machine: ProductType;
  className?: string;
  style?: { maxWidth: string; maxHeight: string };
};

export const ProductItem: React.FC<Props> = ({
  className = '',
  machine,
  ...props
}) => {
  const navigate = useNavigate();
  const promoType: PromoType =
    (machine && getPromoType(machine)) || 'Recomended';

  const handleClick = () => {
    navigate(`/product/${machine.id}?tab=general`);
  };

  return (
    <div
      {...props}
      className={`ProductItem ${className}`}
      onClick={handleClick}
    >
      <div className="ProductItem__image">
        <img
          className="ProductItem__image-box"
          src={GOOGLE_DRIVE_URL + machine.product_images[0]}
          crossOrigin="anonymous"
          width="280"
          height="420"
        />
        <div
          className={cn('ProductItem__image-lable', {
            'ProductItem__image-lable--new': promoType === 'New',
            'ProductItem__image-lable--top': promoType === 'Top',
          })}
        >
          {promoType}
        </div>
      </div>

      <div className="ProductItem__desc">
        <div className="ProductItem__desc-top">
          <p className="ProductItem__subtitle">{machine.brand}</p>
          <h3 className="ProductItem__title">{machine.title}</h3>

          <p className="ProductItem__breadcrumb">
            {`${machine.category} / New / Unused`}
          </p>
        </div>

        <div className="ProductItem__desc-bottom">
          <div className="ProductItem__desc-bottom-l">
            <p className="ProductItem__year">{machine.year}</p>
            <p className="ProductItem__time">{machine.hours}</p>
          </div>

          <div className="ProductItem__desc-bottom-r">
            <p className="ProductItem__article">
              {ARTICUL_PREFIX + machine.id}
            </p>
            <p className="ProductItem__price">€ {machine.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
