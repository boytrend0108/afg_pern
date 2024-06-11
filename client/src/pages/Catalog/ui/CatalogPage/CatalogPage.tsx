import cn from 'classnames';

import { MySearch } from '../../../../shared/ui';
import { CatalogFilters } from '../../../../widgets/CatalogFilters';
import { CategoryList } from '../../../../widgets/CategoryList';
import './CatalogPage.scss';
import { useEffect, useState } from 'react';
import { CatalogList } from '../CatalogList/CatalogList';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import * as productItem from '../../../../entities/ProductItem';
import { MyLoader } from '../../../../shared/ui/MyLoader/MyLoader';
import { useScrollToTop } from '../../../../shared/hooks';

export const CatalogPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { products, loading, error } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useScrollToTop();

  useEffect(() => {
    dispatch(productItem.getAll());
  }, []);

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

        {loading && (
          <div className="CatalogPage__loader">
            <MyLoader />
          </div>
        )}
        {error && <p className="CatalogPage__error">Something went wrong...</p>}
        {!loading && !error && (
          <CatalogList setShowFilters={setShowFilters} machines={products} />
        )}

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
