import { CategoryItem } from '../../../entities';

import './CategoryList.scss';
import { CategoryType } from '../../../shared/types/category';
import React from 'react';

type Props = {
  categories: CategoryType[];
};

export const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <div className="CategoryList">
      {categories.map((c) => (
        <div key={c.id}>
          <CategoryItem category={c} />
        </div>
      ))}
    </div>
  );
};
