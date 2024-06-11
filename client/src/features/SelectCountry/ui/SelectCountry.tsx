import { useRef, useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/reduxHooks';
import './SelectCountry.scss';
import { MyFlags } from '../../../shared/ui';
import { useHideDrop } from '../../../shared/hooks';

export const SelectCountry = () => {
  const { country } = useAppSelector((state) => state.country);
  const [showCountry, setShowCountry] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  const toogleCountry = () => {
    setShowCountry(!showCountry);
  };

  useHideDrop(selectRef, setShowCountry);

  return (
    <button
      className="SelectCountry"
      onClick={toogleCountry}
      ref={selectRef}
      aria-label="select country"
    >
      <ul className="SelectCountry__flags MyFlags" style={{ display: 'block' }}>
        <li className={`flag ${country} SelectCountry__flag`} />
      </ul>

      <img
        src="/my-icons/arrow-down.png"
        alt="arrow down"
        className="SelectCountry__icon--arrow"
      />

      <div
        className="SelectCountry__drop SelectCountry__drop--flags"
        style={{ pointerEvents: !showCountry ? 'none' : 'auto' }}
      >
        <div
          className={
            showCountry
              ? 'SelectCountry__country'
              : 'SelectCountry__country--hide'
          }
        >
          <div className="Control__flags">
            <MyFlags />
          </div>
        </div>
      </div>
    </button>
  );
};
