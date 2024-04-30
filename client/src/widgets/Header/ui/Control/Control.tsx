import './Control.scss';
import { SelectCurrency } from '../../../../features/SelectCurrency';
import { SelectCountry } from '../../../../features/SelectCountry';

export const Control = () => {
  return (
    <div className="Control">
      <button className="Control__btn">
        <img src="/icons/search.png" alt="search" />
      </button>

      <SelectCurrency />

      <SelectCountry />

      <button className="Control__btn">4</button>
    </div>
  );
};
