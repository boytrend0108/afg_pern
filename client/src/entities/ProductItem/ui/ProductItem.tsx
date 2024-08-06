import React, { useRef, useState } from 'react';
import cn from 'classnames';

import './ProductItem.scss';
import { ProductType, PromoType } from '../types';
import { ARTICUL_PREFIX } from '../../../shared/consts/product';
// eslint-disable-next-line max-len
import { getPromoType } from '../../../pages/ProductPage/helpers/getPromoType';
import { useTranslation } from 'react-i18next';
import { useGetPrice, useLoadImage } from '../../../shared/hooks';

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
  const { t } = useTranslation();
  const [preparedPrice, setPreparedPrice] = useState('$ 0');
  const imageRef = useRef<HTMLImageElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useGetPrice(machine, setPreparedPrice);
  useLoadImage(imageRef, setIsImageLoaded);

  const promoType: PromoType =
    (machine && getPromoType(machine)) || 'Recommended';

  return (
    <div {...props} className={`ProductItem ${className}`}>
      <div className="ProductItem__image">
        <div className="ProductItem__image-blur">
          <img
            ref={imageRef}
            loading="lazy"
            className={cn('ProductItem__image-box', {
              'ProductItem__image-box--loaded': isImageLoaded,
            })}
            src={`${import.meta.env.VITE_API_BASE_URL}/api/thumbnail?id=${machine.image}`}
            width="400"
            height="280"
          />
        </div>

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
            {t(`Categories.${machine.category}`)} /{' '}
            {t(`ProductItem.${promoType}`)}
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
            <p className="ProductItem__price">{preparedPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
