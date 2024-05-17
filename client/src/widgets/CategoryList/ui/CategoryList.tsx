import { CategoryItem } from '../../../entities/CategoryItem';
import cn from 'classnames';

import './CategoryList.scss';
import { CategoryType } from '../../../shared/types/category';
import React, { Fragment, useEffect, useState } from 'react';
import { CATEGORIES } from '../../../shared/consts/categjries';
import { getPreparedCategories } from '../helpers/getPreparedCategories';

type Props = {
  categories: CategoryType[];
};

export const CategoryList: React.FC<Props> = ({ categories }) => {
  const [showAll, setShowAll] = useState(false);
  const [slicedCategories, setSlicedCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const sliceList = () => {
      const c = getPreparedCategories(CATEGORIES, window.innerWidth);

      setSlicedCategories(c);
    };

    sliceList();

    window.addEventListener('resize', sliceList);

    return () => {
      window.removeEventListener('resize', sliceList);
    };
  }, []);

  return (
    <div className="CategoryList">
      {categories.map((c) => (
        <Fragment key={c.id}>
          <CategoryItem category={c} />
        </Fragment>
      ))}

      <button
        className={cn('Categories__btn', {
          'Categories__btn---active': showAll,
        })}
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'Hide all categories' : 'View all categories'}

        <img
          src="/my-icons/arrow-down.png"
          alt="view all"
          className={cn('Categories__arrow', {
            'Categories__arrow--active': showAll,
          })}
        />
      </button>
    </div>
  );
};
