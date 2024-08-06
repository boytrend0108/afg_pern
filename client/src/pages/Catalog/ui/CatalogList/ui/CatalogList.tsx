/* eslint-disable max-len */
import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import './CatalogList.scss';
import { getSearchParams } from '../../../../../shared/helpers/getSearchParams';
import {
  MyButton,
  MyButtonWhite,
  MyPagination,
} from '../../../../../shared/ui';
import { ProductItem } from '../../../../../entities/ProductItem';
import { MyLoader } from '../../../../../shared/ui/MyLoader/MyLoader';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../shared/hooks/reduxHooks';
import { resetFilters } from '../../../../../features/ResetFilters/resetFilters';
import { goToProductPage } from '../../../../../shared/helpers/goToProductPage';

type Props = {
  setShowFilters: (v: boolean) => void;
};

export const CatalogList: React.FC<Props> = ({ setShowFilters }) => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const show = searchParams.get('show') || 'all';
  const orderByPrice = searchParams.get('order-by-price') || '';

  function handleOrderByPrice() {
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
  }

  function handleReset() {
    resetFilters(setSearchParams, dispatch);
  }

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

          {!!searchParams.size && (
            <MyButtonWhite className="CatalogList__btn" onClick={handleReset}>
              Reset Filters
            </MyButtonWhite>
          )}

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
        {!products.length && !loading && (
          <h3 className="CatalogList__error">
            There are no cars with such parameters
          </h3>
        )}

        {!!products.length &&
          products.map((m) => {
            return (
              <div
                key={m.id}
                onClick={() => goToProductPage(m, navigate, dispatch)}
              >
                <ProductItem machine={m} />
              </div>
            );
          })}
      </div>

      <div className="CatalogList__pagination">
        <MyPagination />
      </div>
    </div>
  );
};
