import React from 'react';

import './MyFlags.scss';
import { Country } from '../../types/country';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setCountry } from '../../../app/store/countryReducer';

export const MyFlags = () => {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const country = (e.target as HTMLElement).dataset.country as Country;

    if (country) {
      dispatch(setCountry(country));
    }
  };

  return (
    <ul className="MyFlags" onClick={handleClick}>
      <li
        className={`flag ${Country.holland}`}
        data-country={Country.holland}
      />

      <li
        className={`flag ${Country.england}`}
        data-country={Country.england}
      />

      <li className={`flag ${Country.france}`} data-country={Country.france} />
      <li className={`flag ${Country.greece}`} data-country={Country.greece} />

      <li
        className={`flag ${Country.germany}`}
        data-country={Country.germany}
      />

      <li
        className={`flag ${Country.ukraine}`}
        data-country={Country.ukraine}
      />

      <li
        className={`flag ${Country.sAravia}`}
        data-country={Country.sAravia}
      />

      <li className={`flag ${Country.us}`} data-country={Country.us} />

      <li
        className={`flag ${Country.romania}`}
        data-country={Country.romania}
      />

      <li className={`flag ${Country.spaine}`} data-country={Country.spaine} />
      <li className={`flag ${Country.portug}`} data-country={Country.portug} />
      <li className={`flag ${Country.poland}`} data-country={Country.poland} />

      <li
        className={`flag ${Country.bulgaria}`}
        data-country={Country.bulgaria}
      />

      <li
        className={`flag ${Country.hungary}`}
        data-country={Country.hungary}
      />

      <li className={`flag ${Country.italy}`} data-country={Country.italy} />
      <li className={`flag ${Country.turkey}`} data-country={Country.turkey} />
      <li className={`flag ${Country.oae}`} data-country={Country.oae} />
    </ul>
  );
};
