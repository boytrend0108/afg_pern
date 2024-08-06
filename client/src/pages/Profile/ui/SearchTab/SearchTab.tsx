import React, { useEffect, useState } from 'react';
import { MySearch } from '../../../../shared/ui';
import './SearchTab.scss';
// eslint-disable-next-line max-len
import localStorageService from '../../../../shared/services/localStorageService';
import { useNavigate } from 'react-router-dom';

export const SearchTab = () => {
  const [searches, setSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const s = localStorageService.get('searches') || [];

    setSearches(s);
  }, []);

  function removeSearchItem(ev: React.MouseEvent, searchItem: string) {
    ev.stopPropagation();

    const s = (localStorageService.get('searches') as string[]) || [];
    const newSearches = s.filter((el) => el !== searchItem);

    setSearches(newSearches);
    localStorageService.set('searches', newSearches);
  }

  function goToCatalog(search: string) {
    navigate(`/catalog?query=${search}`);
  }

  return (
    <div className="SearchTab">
      <MySearch title="Save this search" />

      <div className="SearchTab__list">
        {searches.map((s, i) => (
          <div
            className="SearchTab__item"
            key={i}
            onClick={() => goToCatalog(s)}
          >
            <img
              src="/my-icons/search-black.svg"
              alt="search history"
              className="SearchTab__icon-search"
            />

            <p className="SearchTab__value">{s}</p>

            <button
              className="SearchTab__delete"
              onClick={(e) => removeSearchItem(e, s)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
