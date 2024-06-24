/* eslint-disable no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import './CategoryItem.scss';
import { CategoryType } from '../types';
import { useTranslation } from 'react-i18next';

type Props = {
  category: CategoryType;
};

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const { image, name, productCount } = category;
  const [onHover, setOnhover] = useState(false);
  const item = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const onMouseOver = () => {
      setOnhover(true);
    };

    const onMouseLeave = () => {
      setOnhover(false);
    };

    item.current?.addEventListener('mouseover', onMouseOver);
    item.current?.addEventListener('mouseleave', onMouseLeave);

    return () => {
      item.current?.removeEventListener('mouseover', onMouseOver);
      item.current?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="CategoryItem" ref={item}>
      <div className="CategoryItem__counter">{productCount}</div>

      {onHover ? (
        <img
          src={`/my-icons/categories/onHover/${image}-hover.png`}
          className="CategoryItem__img"
        />
      ) : (
        <img
          crossOrigin="anonymous"
          src={`/my-icons/categories/${image}.svg`}
          className="CategoryItem__img"
          width={90}
          height={90}
        />
      )}

      <div className="CategoryItem__title">{t(`Categories.${name}`)}</div>
    </div>
  );
};
