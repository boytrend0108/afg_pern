import { useState } from 'react';
import cn from 'classnames';

import { MySearch } from '../../../../shared/ui';
import { CategoryList } from '../../../../widgets/CategoryList';
import { CATEGORIES } from '../../../../shared/consts/categjries';
import './CatalogPage.scss';

export const CatalogPage = () => {
  const [showAll, setShowAll] = useState(false);
  const slicedCategories = CATEGORIES.slice(0, 8);

  return (
    <section className="CatalogPage container">
      <header className="CatalogPage__header">
        <MySearch style={{ marginBottom: '50px' }} />
        <CategoryList categories={showAll ? CATEGORIES : slicedCategories} />

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
      </header>
      <main className="CatalogPage__main">
        <aside className="CatalogPage__filters"></aside>
        <div className="CatalogPage__list"></div>
      </main>
    </section>
  );
};
