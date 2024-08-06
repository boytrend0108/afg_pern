/* eslint-disable no-console */
import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './CategoryList.scss';
import {
  CategoryType,
  CategoryItem,
  categoryAPI,
} from '../../../entities/CategoryItem';
import { useAdjustBtnVisibility } from '../hooks/useAdjustBtnVisibility';
import { useAdjustWrapperHeight } from '../hooks/useAdjustWrapperHeight';

export const CategoryList = memo(() => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [buttonVisible, setBattonVisible] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const list = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  console.log('render');

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

  function goToCatalog(categoryId: number) {
    navigate(`/catalog?categoryId=${categoryId}`);
  }

  return (
    <div className="CategoryList">
      <div className="CategoryList__wr" ref={wrapper}>
        <div ref={list} className="CategoryList__list">
          {categories.map((c) => (
            <div key={c.id} onClick={() => goToCatalog(c.id)}>
              <CategoryItem category={c} />
            </div>
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
});
