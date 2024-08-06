/* eslint-disable max-len */
import { ChangeEvent, useRef, useState } from 'react';
import cn from 'classnames';

import './Search.scss';
import { useHideDrop } from '../../../shared/hooks';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
// import * as productItem from '../../../entities/ProductItem';
// import localStorageService from '../../../shared/services/localStorageService';
import { getProductsBySearch } from '../../../shared/helpers/getProductsBySearch';

export const Search = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLButtonElement>(null);

  useHideDrop(searchRef, setShowSearch);

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
    <button
      className="Search"
      onClick={() => {
        setShowSearch(!showSearch);
      }}
      ref={searchRef}
    >
      <img src="/my-icons/search.png" alt="search" />

      <div
        className={cn('Search__drop', {
          'Search__drop--hidden': !showSearch,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn('Search__box', {
            'Search__box--hidden': !showSearch,
          })}
        >
          <input
            value={query}
            onChange={changeSearch}
            type="text"
            className="Search__input"
            placeholder="Machines..."
          />

          <Link
            to={{ pathname: '/catalog', search: searchParams.toString() }}
            className="Search__btn"
            onClick={getProducts}
          >
            <img
              src="/my-icons/search.png"
              alt="search"
              className="Search__icon"
            />
          </Link>
        </div>
      </div>
    </button>
  );
};
