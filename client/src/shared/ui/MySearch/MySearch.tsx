import React, { ChangeEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './MySearch.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hooks/reduxHooks';
import * as productItem from '../../../entities/ProductItem';
import localStorageService from '../../services/localStorageService';

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
    if (!query) {
      return;
    }

    let searches = [];

    dispatch(productItem.getAll(searchParams));
    searches = (localStorageService.get('searches') as string[]) || [];

    if (!searches.includes(query)) {
      searches.push(query);
      localStorageService.set('searches', searches);
    }
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
