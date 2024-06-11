import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import './MyTabSwitcher.scss';
import { getSearchParams } from '../../helpers/getSearchParams';
import React from 'react';
import { Tab } from './types';
import { useTranslation } from 'react-i18next';

type Props = {
  tabs: Tab[];
};

export const MyTabSwitcher: React.FC<Props> = ({ tabs }) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'settings';
  const { t } = useTranslation();

  return (
    <div className="MyTabSwitcher">
      {tabs.map((el) => (
        <Link
          key={el.id}
          to={{ search: getSearchParams('tab', el.tab, searchParams) }}
          className={cn('MyTabSwitcher__btn', {
            'MyTabSwitcher__btn--active': tab === el.tab,
          })}
        >
          {t(`MyTabSwitcher.${el.title}`)}
        </Link>
      ))}
    </div>
  );
};
