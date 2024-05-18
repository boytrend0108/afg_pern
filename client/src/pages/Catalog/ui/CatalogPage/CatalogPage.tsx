import cn from 'classnames';

import { MySearch } from '../../../../shared/ui';
import { CatalogFilters } from '../../../../widgets/CatalogFilters';
import { CategoryList } from '../../../../widgets/CategoryList';
import './CatalogPage.scss';
import { useState } from 'react';
import { CatalogList } from '../CatalogList/CatalogList';

const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const CatalogPage = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section
      className={cn('CatalogPage', {
        container: !showFilters,
      })}
    >
      <header className="CatalogPage__header">
        <MySearch style={{ marginBottom: '50px' }} />
        <CategoryList />
      </header>

      <main className="CatalogPage__main">
        <CatalogFilters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <CatalogList setShowFilters={setShowFilters} machines={machines} />

        <div
          onClick={() => setShowFilters(false)}
          className={cn('CatalogPage__background', {
            'CatalogPage__background--show': showFilters,
          })}
        />
      </main>
    </section>
  );
};
