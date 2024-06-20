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
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="Search__input"
            placeholder="Machines, type, setting..."
          />

          <div className="Search__btn">
            <img
              src="/my-icons/search.png"
              alt="search"
              className="Search__icon"
            />
          </div>
        </div>
      </div>
    </button>
  );
};
