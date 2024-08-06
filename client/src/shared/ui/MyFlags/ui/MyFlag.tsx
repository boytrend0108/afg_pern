/* eslint-disable max-len */
import React, { useEffect } from 'react';

import './MyFlags.scss';
import i18n from '../../../../app/configs/i18n';
import { Country } from '../../../types/country';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setCountry } from '../../../../app/store/countryReducer';
import localStorageService from '../../../services/localStorageService';
import { I18N } from '../../../consts/i18n';
import { CONTRIES } from '../consts';

export const MyFlags = () => {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const country = (e.target as HTMLElement).dataset.country as Country;

    i18n.changeLanguage(country);

    if (country) {
      dispatch(setCountry(country));
    }
  };

  useEffect(() => {
    let lang = localStorageService.get(I18N.LOCAL_STORAGE_KEY);

    if (!lang) {
      return;
    }

    if (lang.includes('-')) {
      lang = lang.split('-')[0];
    }

    dispatch(setCountry(lang));
  }, []);

  return (
    <ul className="MyFlags" onClick={handleClick}>
      {CONTRIES.map((c) => (
        <li key={c} className={`flag ${c}`} data-country={c} />
      ))}
    </ul>
  );
};
