import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import './CatalogList.scss';
import { getSearchParams } from '../../../../shared/helpers/getSearchParams';
import { MyButton } from '../../../../shared/ui';
import { ProductItem } from '../../../../entities/ProductItem';
import { ProductType } from '../../../../entities/ProductItem/types';
import { useTranslation } from 'react-i18next';

type Props = {
  setShowFilters: (v: boolean) => void;
  machines: ProductType[];
};

export const CatalogList: React.FC<Props> = ({ setShowFilters, machines }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const show = searchParams.get('show') || 'all';
  const brandIds = searchParams.getAll('brandId');
  const categoriesIds = searchParams.getAll('categoryId');
  const priceMin = searchParams.get('price-min');
  const priceMax = searchParams.get('price-max');
  const hoursMin = searchParams.get('hours-min');
  const hoursMax = searchParams.get('hours-max');
  const yearMin = searchParams.get('year-min');
  const yearMax = searchParams.get('year-max');
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

  const filteredMachines = useMemo(() => {
    let result = machines;

    if (show !== 'all') {
      result = result.filter((el) => {
        return el.product_infos.some((item) => {
          return (
            item.title === 'promoType' &&
            (item.description as string).toLowerCase() === show
          );
        });
      });
    }

    if (brandIds.length) {
      result = result.filter((el) => brandIds.includes(el.brandId.toString()));
    }

    if (categoriesIds.length) {
      result = result.filter((el) => {
        return categoriesIds.includes(el.categoryId.toString());
      });
    }

    if (priceMin) {
      result = result.filter((el) => {
        return +el.price >= +priceMin;
      });
    }

    if (priceMax) {
      result = result.filter((el) => {
        return +el.price <= +priceMax;
      });
    }

    if (hoursMin) {
      result = result.filter((el) => {
        return +el.hours >= +hoursMin;
      });
    }

    if (hoursMax) {
      result = result.filter((el) => {
        return +el.hours <= +hoursMax;
      });
    }

    if (yearMin) {
      result = result.filter((el) => {
        return +el.hours >= +yearMin;
      });
    }

    if (yearMax) {
      result = result.filter((el) => {
        return +el.hours <= +yearMax;
      });
    }

    return result;
  }, [machines, searchParams]);

  return (
    <div className="CatalogList">
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
        {filteredMachines.map((m) => {
          return <ProductItem key={m.id} machine={m} />;
        })}
      </div>
    </div>
  );
};
