import { useRef, useState } from 'react';
import cn from 'classnames';

import './Search.scss';
import { useHideDrop } from '../../../shared/hooks';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLButtonElement>(null);

  useHideDrop(searchRef, setShowSearch);

  return (
    <button
      className="Search"
      onClick={(e) => {
        setShowSearch(!showSearch);
      }}
      ref={searchRef}
    >
      <img src="/icons/search.png" alt="search" />

      <div className="Search__drop" onClick={(e) => e.stopPropagation()}>
        <div
          className={cn('Search__box', {
            'Search__box--hidden': !showSearch,
          })}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="Search__input"
            placeholder="Machines, type, setting..."
          />

          <button className="Search__btn">
            <img src="/icons/search.png" alt="search" />
          </button>
        </div>
      </div>
    </button>
  );
};
