import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/hooks/reduxHooks';
import './SelectCurrency.scss';
import { Currency } from '../../../shared/types/currency';
import { setCurrency } from '../../../app/store/currencyReducer';

export const SelectCurrency = () => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.currency);
  const [showCurrency, setShowCurrency] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  const changeCurrency = (currencyType: Currency) => {
    dispatch(setCurrency(currencyType));
    setShowCurrency(false);
  };

  const toogleCurrency = () => {
    setShowCurrency(!showCurrency);
  };

  useEffect(() => {
    const closeSelect = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setShowCurrency(false);
      }
    };

    document.body.addEventListener('mousedown', closeSelect);

    return () => {
      document.body.removeEventListener('mousedown', closeSelect);
    };
  }, []);

  return (
    <button className="SelectCurrency" onClick={toogleCurrency} ref={selectRef}>
      <img src={`/icons/currenсies/${currency}.png`} alt={currency} />
      <img src="/icons/arrow-down.png" alt="arrow down" />

      <div
        className="SelectCurrency__drop"
        style={{ pointerEvents: !showCurrency ? 'none' : 'auto' }}
      >
        <ul
          className={cn('SelectCurrency__currency-list', {
            'SelectCurrency__currency-list--hidden': !showCurrency,
          })}
        >
          <li
            className="SelectCurrency__currency"
            onClick={() => changeCurrency(Currency.euro)}
          >
            <img
              src={`/icons/currenсies/euro.png`}
              alt={Currency.euro}
              width={25}
              height={25}
            />
            <p> - US Dollar</p>
          </li>

          <li
            className="SelectCurrency__currency"
            onClick={() => changeCurrency(Currency.dollar)}
          >
            <img
              src={`/icons/currenсies/dollar.png`}
              alt="dollar"
              width={25}
              height={25}
            />
            <p> - US Dollar</p>
          </li>

          <li
            className="SelectCurrency__currency"
            onClick={() => changeCurrency(Currency.pound)}
          >
            <img
              src={`/icons/currenсies/pound.png`}
              alt={Currency.pound}
              width={25}
              height={25}
            />
            <p> - Pound</p>
          </li>
        </ul>
      </div>
    </button>
  );
};
