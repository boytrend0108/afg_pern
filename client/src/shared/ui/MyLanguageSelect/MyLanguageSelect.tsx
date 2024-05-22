import React, { useRef, useState } from 'react';
import cn from 'classnames';

import './MyLanguageSelect.scss';
import '../../../shared/ui/MyFlags/MyFlags.scss';
import { Country } from '../../types/country';
import { useHideDrop } from '../../hooks';

type Props = {
  value?: string;
  flag?: string;
};

export const MyLanguageSelect: React.FC<Props> = ({ value, flag }) => {
  const [show, setShow] = useState(false);
  const [lang, setLang] = useState(flag || Country.england);
  const [fullName, setFullname] = useState(value || 'Select language*');
  const select = useRef<HTMLDivElement>(null);

  useHideDrop(select, setShow);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const country = (e.target as HTMLDivElement).dataset.country as Country;

    if (country) {
      setLang(country);
      setFullname((e.target as HTMLDivElement).innerText);
      setShow(false);
    }
  };

  return (
    <div className="MyLanguageSelect" onClick={handleClick} ref={select}>
      <div className="MyLanguageSelect__header" onClick={() => setShow(!show)}>
        {fullName}

        <div className={` MyLanguageSelect__flag flag ${lang}`} />
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
          <div
            className="MyLanguageSelect__option"
            data-country={Country.england}
          >
            English
            <div
              className={` MyLanguageSelect__flag flag ${Country.england}`}
            />
          </div>

          <div
            className="MyLanguageSelect__option"
            data-country={Country.ukraine}
          >
            Ukrainian
            <div
              className={` MyLanguageSelect__flag flag ${Country.ukraine}`}
            />
          </div>

          <div
            className="MyLanguageSelect__option"
            data-country={Country.germany}
          >
            German
            <div
              className={` MyLanguageSelect__flag flag ${Country.germany}`}
            />
          </div>

          <div
            className="MyLanguageSelect__option"
            data-country={Country.france}
          >
            France
            <div className={` MyLanguageSelect__flag flag ${Country.france}`} />
          </div>

          <div
            className="MyLanguageSelect__option"
            data-country={Country.holland}
          >
            Holland
            <div
              className={` MyLanguageSelect__flag flag ${Country.holland}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
