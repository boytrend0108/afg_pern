import { CategoryItem } from '../../../entities/CategoryItem';

import './CategoryList.scss';
import { CategoryType } from '../../../shared/types/category';
import React, { Fragment } from 'react';

type Props = {
  categories: CategoryType[];
};

export const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <div className="CategoryList">
      {categories.map((c) => (
        <Fragment key={c.id}>
          <CategoryItem category={c} />
        </Fragment>
      ))}
    </div>
  );
};
