import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import './CatalogList.scss';
import { getSearchParams } from '../../../../../shared/helpers/getSearchParams';
import { MyButton, MyPagination } from '../../../../../shared/ui';
import { ProductItem } from '../../../../../entities/ProductItem';
import { MyLoader } from '../../../../../shared/ui/MyLoader/MyLoader';
import { useAppSelector } from '../../../../../shared/hooks/reduxHooks';

type Props = {
  setShowFilters: (v: boolean) => void;
};

export const CatalogList: React.FC<Props> = ({ setShowFilters }) => {
  const { products, loading, error } = useAppSelector((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const show = searchParams.get('show') || 'all';
  const orderByPrice = searchParams.get('order-by-price') || '';

  const handleOrderByPrice = () => {
    switch (orderByPrice) {
      case 'asc':
        setSearchParams(
          getSearchParams('order-by-price', 'desc', searchParams),
        );
        break;

      case 'desc':
        setSearchParams(getSearchParams('order-by-price', null, searchParams));
        break;

      default:
        setSearchParams(getSearchParams('order-by-price', 'asc', searchParams));
    }
  };

  return (
    <div className="CatalogList">
      {loading && (
        <div className="CatalogPage__loader">
          <MyLoader />
        </div>
      )}

      {error && <p className="CatalogPage__error">Something went wrong...</p>}

      <div className="CatalogList__filters my-container">
        <div className="CatalogList__filter-category">
          <Link
            to={{ search: getSearchParams('show', 'all', searchParams) }}
            className={cn('CatalogList__filter', {
              'CatalogList__filter--active': show === 'all',
            })}
          >
            {t('CatalogPage.All')}
          </Link>

          <Link
            to={{ search: getSearchParams('show', 'top', searchParams) }}
            className={cn('CatalogList__filter CatalogList__filter--top', {
              'CatalogList__filter--active': show === 'top',
            })}
          >
            {t('CatalogPage.Top sellers')}
          </Link>

          <Link
            to={{ search: getSearchParams('show', 'new', searchParams) }}
            className={cn('CatalogList__filter', {
              'CatalogList__filter--active': show === 'new',
            })}
          >
            {t('CatalogPage.New')}
          </Link>

          <Link
            to={{ search: getSearchParams('show', 'used', searchParams) }}
            className={cn('CatalogList__filter', {
              'CatalogList__filter--active': show === 'used',
            })}
          >
            {t('CatalogPage.Used')}
          </Link>
        </div>

        <div className="CatalogList__btn-box my-container">
          <MyButton
            className="CatalogList__btn"
            onClick={() => setShowFilters(true)}
          >
            {t('CatalogPage.Filters')}
          </MyButton>

          <button
            className="CatalogList__filter-price"
            onClick={handleOrderByPrice}
          >
            {t('CatalogPage.Price (high - low)')}
            <img
              src="./my-icons/arrow-up.svg"
              alt="arrow up"
              className={cn('CatalogList__arrow', {
                'CatalogList__arrow--desc': orderByPrice === 'desc',
                'CatalogList__arrow--asc': orderByPrice === 'asc',
              })}
            />
          </button>
        </div>
      </div>

      <div className="CatalogList__items my-container">
        {!products.length && (
          <h3 className="CatalogList__error">
            There are no cars with such parameters
          </h3>
        )}

        {!!products.length &&
          products.map((m) => {
            return <ProductItem key={m.id} machine={m} />;
          })}
      </div>

      <div className="CatalogList__pagination">
        <MyPagination />
      </div>
    </div>
  );
};
