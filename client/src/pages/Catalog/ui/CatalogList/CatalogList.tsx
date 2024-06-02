import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import './CatalogList.scss';
import { getSearchParams } from '../../../../shared/helpers/getSearchParams';
import { MyButton } from '../../../../shared/ui';
import { ProductItem } from '../../../../entities/ProductItem';
import { ProductType } from '../../../../entities/ProductItem/types';

type Props = {
  setShowFilters: (v: boolean) => void;
  machines: ProductType[];
};

export const CatalogList: React.FC<Props> = ({ setShowFilters, machines }) => {
  const [searchParams, setSearchParams] = useSearchParams();
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
      <div className="CatalogList__filters">
        <div className="CatalogList__filter-category">
          <Link
            to={{ search: getSearchParams('show', 'all', searchParams) }}
            className={cn('CatalogList__filter', {
              'CatalogList__filter--active': show === 'all',
            })}
          >
            All
          </Link>

          <Link
            to={{ search: getSearchParams('show', 'top', searchParams) }}
            className={cn('CatalogList__filter CatalogList__filter--top', {
              'CatalogList__filter--active': show === 'top',
            })}
          >
            Top sellers
          </Link>

          <Link
            to={{ search: getSearchParams('show', 'new', searchParams) }}
            className={cn('CatalogList__filter', {
              'CatalogList__filter--active': show === 'new',
            })}
          >
            New
          </Link>

          <Link
            to={{ search: getSearchParams('show', 'used', searchParams) }}
            className={cn('CatalogList__filter', {
              'CatalogList__filter--active': show === 'used',
            })}
          >
            Used
          </Link>
        </div>

        <div className="CatalogList__btn-box">
          <MyButton
            className="CatalogList__btn"
            onClick={() => setShowFilters(true)}
          >
            Filters
          </MyButton>

          <button
            className="CatalogList__filter-price"
            onClick={handleOrderByPrice}
          >
            Price (high - low)
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

      <div className="CatalogList__items">
        {machines.map((m) => {
          return <ProductItem key={m.id} machine={m} />;
        })}
      </div>
    </div>
  );
};
