import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { CatalogFilter } from './CatalogFilter/CatalogFilter';
import { FITERS } from '../consts';
import { Fragment } from 'react/jsx-runtime';
import './CatalogFilters.scss';
import { MyCheckbox } from '../../../shared/ui/MyCheckbox/MyCheckbox';
import { useTranslation } from 'react-i18next';
import { Brand } from '../../../entities/BrandItem/types';
import { brandAPI } from '../../../entities/BrandItem';

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

  useEffect(() => {
    brandAPI
      .getAll()
      .then(setBrands)
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }, []);

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

      {FITERS.map((f) => (
        <Fragment key={f.id}>
          <CatalogFilter
            minValue={f.minValue}
            middleValue={f.middleValue}
            maxValue={f.maxValue}
            title={f.title}
            id={f.id}
          />
        </Fragment>
      ))}

      <div className="CatalogFilters__brands">
        <p className="CatalogFilters__title">Brands</p>
        {brands.map((b) => (
          <div key={b.id} className="CatalogFilters__brand">
            <MyCheckbox label={b.name} id={b.id} />
          </div>
        ))}
      </div>
    </aside>
  );
};
