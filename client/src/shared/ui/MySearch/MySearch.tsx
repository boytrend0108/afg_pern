import { Link, useSearchParams } from 'react-router-dom';
import './MySearch.scss';
import React, { ChangeEvent } from 'react';

type Props = {
  props?: any;
  style?: any;
  title?: string;
};

export const MySearch: React.FC<Props> = ({ title = 'Search', ...props }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const currentQuery = e.target.value;

    if (currentQuery.length) {
      params.set('query', currentQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  return (
    <div className="MySearch" {...props}>
      {title}
      <div className="MySearch__input">
        <input
          value={query}
          onChange={changeSearch}
          type="text"
          className="MySearch__input-field"
          placeholder="Machines, type, setting..."
        />

        <Link
          to={{ pathname: '/catalog', search: searchParams.toString() }}
          className="MySearch__input-btn"
        />
      </div>
    </div>
  );
};
