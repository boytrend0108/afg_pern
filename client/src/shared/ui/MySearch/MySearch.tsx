import React, { ChangeEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './MySearch.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { getProductsBySearch } from '../../helpers/getProductsBySearch';

type Props = {
  props?: any;
  style?: any;
  title?: string;
};

export const MySearch: React.FC<Props> = ({ title = 'Search', ...props }) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { t } = useTranslation();

  function changeSearch(e: ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const currentQuery = e.target.value;

    if (currentQuery.length) {
      params.set('query', currentQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function getProducts() {
    getProductsBySearch(query, dispatch, searchParams);
  }

  return (
    <div className="MySearch" {...props}>
      {t(`Categories.${title}`)}

      <div className="MySearch__input">
        <input
          value={query}
          onChange={changeSearch}
          type="text"
          className="MySearch__input-field"
          placeholder={t('Categories.Machines, type, setting...')}
        />

        <Link
          to={{ pathname: '/catalog', search: searchParams.toString() }}
          className="MySearch__input-btn"
          aria-label="search"
          onClick={getProducts}
        />
      </div>
    </div>
  );
};
