import cn from 'classnames';

import { MySearch } from '../../../../shared/ui';
import { CatalogFilters } from '../../../../widgets/CatalogFilters';
import { CategoryList } from '../../../../widgets/CategoryList';
import './CatalogPage.scss';
import { useEffect, useState } from 'react';
import { CatalogList } from '../CatalogList/ui/CatalogList';
import * as productItem from '../../../../entities/ProductItem';
import { useScrollToTop } from '../../../../shared/hooks';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../shared/hooks/reduxHooks';

export const CatalogPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const dispatch = useAppDispatch();

  useScrollToTop();

  useEffect(() => {
    dispatch(productItem.getAll(searchParams));
  }, [page]);

  return (
    <section className={cn('CatalogPage', {})}>
      <header className="CatalogPage__header  my-container">
        <MySearch style={{ marginBottom: '50px' }} />

        <CategoryList />
      </header>

      <main className="CatalogPage__main">
        <CatalogFilters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <CatalogList setShowFilters={setShowFilters} />

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
