import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import './CatalogFilters.scss';
import { CatalogFilter } from './CatalogFilter/CatalogFilter';
import { FILTERS } from '../consts';
import { Fragment } from 'react/jsx-runtime';
import { MyCheckbox } from '../../../shared/ui/MyCheckbox/MyCheckbox';
import { useTranslation } from 'react-i18next';
import { Brand } from '../../../entities/BrandItem/types';
import { brandAPI } from '../../../entities/BrandItem';
import { CategoryType, categoryAPI } from '../../../entities/CategoryItem';
import { MyButton } from '../../../shared/ui';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { useSearchParams } from 'react-router-dom';
import * as productItem from '../../../entities/ProductItem';

type Props = {
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
};

export const CatalogFilters: React.FC<Props> = ({
  showFilters,
  setShowFilters,
}) => {
  const { t } = useTranslation();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    brandAPI
      .getAll()
      .then(setBrands)
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));

    categoryAPI
      .getAll()
      .then(setCategories)
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

  const applyFilters = () => {
    searchParams.set('page', '1');
    dispatch(productItem.getAll(searchParams));
    setShowFilters(false);
  };

  const resetFilters = () => {
    const params = new URLSearchParams();

    setSearchParams(params);
    dispatch(productItem.getAll(params));
    setShowFilters(false);
  };

  return (
    <aside
      className={cn('CatalogFilters', {
        'CatalogFilters--show': showFilters,
      })}
    >
      <img
        src="/my-icons/close.svg"
        alt="close"
        className="CatalogFilters__close"
        onClick={() => setShowFilters(false)}
      />
      <p className="CatalogFilters__title">{t(`CatalogPage.Filters`)}</p>

      {FILTERS.map((f) => (
        <Fragment key={f.id}>
          <CatalogFilter
            minValue={f.minValue}
            maxValue={f.maxValue}
            title={f.title}
            id={f.id}
            minDistance={f.minDistance}
          />
        </Fragment>
      ))}

      <div className="CatalogFilters__brands">
        <p className="CatalogFilters__title">Brands</p>
        {brands.map((b) => (
          <div key={b.id} className="CatalogFilters__brand">
            <MyCheckbox label={b.name} id={b.id} searchItem="brandId" />
          </div>
        ))}
      </div>

      <div className="CatalogFilters__brands">
        <p className="CatalogFilters__title">Categories</p>
        {categories.map((b) => (
          <div key={b.id} className="CatalogFilters__brand">
            <MyCheckbox label={b.name} id={b.id} searchItem="categoryId" />
          </div>
        ))}
      </div>

      <div className="CatalogFilters__btn-box">
        <MyButton onClick={applyFilters}>Apply</MyButton>
        <MyButton onClick={resetFilters}>Reset</MyButton>
      </div>
    </aside>
  );
};
