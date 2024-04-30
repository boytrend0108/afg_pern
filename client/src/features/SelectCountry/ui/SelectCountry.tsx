import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/reduxHooks';
import './SelectCountry.scss';
import { MyFlags } from '../../../shared/ui';

export const SelectCountry = () => {
  const { country } = useAppSelector((state) => state.country);
  const [showCountry, setShowCountry] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  const toogleCountry = () => {
    setShowCountry(!showCountry);
  };

  useEffect(() => {
    const closeSelect = (e: any) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setShowCountry(false);
      }
    };

    document.body.addEventListener('mousedown', closeSelect);

    return () => {
      document.body.removeEventListener('mousedown', closeSelect);
    };
  }, []);

  return (
    <button className="SelectCountry" onClick={toogleCountry} ref={selectRef}>
      <ul className="SelectCountry__flags MyFlags" style={{ display: 'block' }}>
        <li className={`flag ${country} SelectCountry__flag`} />
      </ul>

      <img src="/icons/arrow-down.png" alt="arrow down" />

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
