import React from 'react';
import cn from 'classnames';

import { CatalogFilter } from './CatalogFilter/CatalogFilter';
import { FITERS } from '../consts';
import { BRANDS } from '../../../shared/consts/brands';
import { Fragment } from 'react/jsx-runtime';
import './CatalogFilters.scss';
import { MyCheckbox } from '../../../shared/ui/MyCheckbox/MyCheckbox';

type Props = {
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
};

export const CatalogFilters: React.FC<Props> = ({
  showFilters,
  setShowFilters,
}) => {
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
      <p className="CatalogFilters__title">Filters</p>

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
        {BRANDS.map((b) => (
          <div key={b.id} className="CatalogFilters__brand">
            <MyCheckbox label={b.brand} id={b.id} />
          </div>
        ))}
      </div>
    </aside>
  );
};
