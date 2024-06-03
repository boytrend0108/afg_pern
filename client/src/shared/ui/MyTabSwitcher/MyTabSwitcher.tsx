import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import './MyTabSwitcher.scss';
import { getSearchParams } from '../../helpers/getSearchParams';
import React from 'react';
import { Tab } from './types';

type Props = {
  tabs: Tab[];
};

export const MyTabSwitcher: React.FC<Props> = ({ tabs }) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'settings';

  return (
    <div className="MyTabSwitcher">
      {tabs.map((t) => (
        <Link
          key={t.id}
          to={{ search: getSearchParams('tab', t.tab, searchParams) }}
          className={cn('MyTabSwitcher__btn', {
            'MyTabSwitcher__btn--active': tab === t.tab,
          })}
        >
          {t.title}
        </Link>
      ))}
    </div>
  );
};
