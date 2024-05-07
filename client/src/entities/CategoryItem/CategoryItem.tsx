import React, { useEffect, useRef, useState } from 'react';
import { CategoryType } from '../../shared/types/category';
import './CategoryItem.scss';

type Props = {
  category: CategoryType;
};

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const { image, title } = category;
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
          src={`/my-icons/categories/${image}.png`}
          className="CategoryItem__img"
        />
      )}

      <div className="CategoryItem__title">{title}</div>
    </div>
  );
};
