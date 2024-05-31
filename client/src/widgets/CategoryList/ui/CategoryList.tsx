/* eslint-disable no-console */
import {
  CategoryType,
  CategoryItem,
  categoryAPI,
} from '../../../entities/CategoryItem';
import cn from 'classnames';

import './CategoryList.scss';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useAdjustBtnVisibility } from '../hooks/useAdjustBtnVisibility';
import { useAdjustWrapperHeight } from '../hooks/useAdjustWrapperHeight';

export const CategoryList = () => {
  const [showAll, setShowAll] = useState(false);
  const [buttonVisible, setBattonVisible] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const list = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  useAdjustBtnVisibility({
    list,
    wrapper,
    setBattonVisible,
    categories,
  });

  useAdjustWrapperHeight({ wrapper, list, showAll });

  useEffect(() => {
    categoryAPI
      .getAll()
      .then(setCategories)
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="CategoryList">
      <div className="CategoryList__wr" ref={wrapper}>
        <div ref={list} className="CategoryList__list">
          {categories.map((c) => (
            <Fragment key={c.id}>
              <CategoryItem category={c} />
            </Fragment>
          ))}
        </div>
      </div>

      {buttonVisible && (
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
      )}
    </div>
  );
};
