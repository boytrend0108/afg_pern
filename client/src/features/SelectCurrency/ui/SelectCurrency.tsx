import { useRef, useState } from 'react';
import cn from 'classnames';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/hooks/reduxHooks';
import './SelectCurrency.scss';
import { Currency } from '../../../shared/types/currency';
import { setCurrency } from '../../../app/store/currencyReducer';
import { useHideDrop } from '../../../shared/hooks';

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

  useHideDrop(selectRef, setShowCurrency);

  return (
    <button className="SelectCurrency" onClick={toogleCurrency} ref={selectRef}>
      <img src={`/my-icons/currenсies/${currency}.png`} alt={currency} />
      <img
        src="/my-icons/arrow-down.png"
        alt="arrow down"
        className="SelectCurrency__icon--arrow"
        width={25}
        height={25}
      />

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
              src={`/my-icons/currenсies/euro.png`}
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
              src={`/my-icons/currenсies/dollar.png`}
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
              src={`/my-icons/currenсies/pound.png`}
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
