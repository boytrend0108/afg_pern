import React, { useRef, useState } from 'react';
import cn from 'classnames';

import './MyLanguageSelect.scss';
import '../../../shared/ui/MyFlags/ui/MyFlags.scss';
import { Country } from '../../types/country';
import { useHideDrop } from '../../hooks';
import { countries } from './consts';

type Props = {
  value?: string;
  flag?: string;
  changeLang: (v: { lang: string; fullName: string }) => void;
};

export const MyLanguageSelect: React.FC<Props> = ({
  value = 'Select language*',
  flag = Country.england,
  changeLang,
}) => {
  const [show, setShow] = useState(false);
  const select = useRef<HTMLDivElement>(null);

  useHideDrop(select, setShow);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const country = (e.target as HTMLDivElement).dataset.country as Country;

    if (country) {
      const newFullName = (e.target as HTMLDivElement).innerText;

      changeLang({ lang: country, fullName: newFullName });
      setShow(false);
    }
  };

  return (
    <div className="MyLanguageSelect" onClick={handleClick} ref={select}>
      <div className="MyLanguageSelect__header" onClick={() => setShow(!show)}>
        {value}

        <div className={` MyLanguageSelect__flag flag ${flag}`} />
      </div>

      <div
        className={cn('MyLanguageSelect__main', {
          'MyLanguageSelect__main--hidden': !show,
        })}
      >
        <div
          className={cn('MyLanguageSelect__drop', {
            'MyLanguageSelect__drop--hidden': !show,
          })}
        >
          {countries.map((c) => (
            <div
              key={c.id}
              className="MyLanguageSelect__option"
              data-country={c.flag}
            >
              {c.lang}
              <div className={` MyLanguageSelect__flag flag ${c.flag}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
