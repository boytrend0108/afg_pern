/* eslint-disable no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import './CategoryItem.scss';
import { CategoryType } from '../types';

type Props = {
  category: CategoryType;
};

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const { image, name } = category;
  const [onHover, setOnhover] = useState(false);
  const item = useRef<HTMLDivElement>(null);

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
      <div className="CategoryItem__counter">14</div>

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

      <div className="CategoryItem__title">{name}</div>
    </div>
  );
};
