import { CategoryItem } from '../../../entities/CategoryItem';
import cn from 'classnames';

import './CategoryList.scss';
import { Fragment, useRef, useState } from 'react';
import { CATEGORIES } from '../../../shared/consts/categories';
import { useSetHeight } from '../hooks/useSetHeight';

export const CategoryList = () => {
  const [showAll, setShowAll] = useState(false);
  const [listHeight, setListHeight] = useState(160);
  const list = useRef(null);

  useSetHeight(list, setListHeight);

  return (
    <div className="CategoryList">
      <div
        ref={list}
        className="CategoryList__list"
        style={{ height: showAll ? `${listHeight}px` : '146px' }}
      >
        {CATEGORIES.map((c) => (
          <Fragment key={c.id}>
            <CategoryItem category={c} />
          </Fragment>
        ))}
      </div>

      <button
        className={cn('CategoryList__btn', {
          'CategoryList__btn---active': showAll,
        })}
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'Hide all categories' : 'View all categories'}

        <img
          src="/my-icons/arrow-down.png"
          alt="view all"
          className={cn('CategoryList__arrow', {
            'CategoryList__arrow--active': showAll,
          })}
        />
      </button>
    </div>
  );
};
