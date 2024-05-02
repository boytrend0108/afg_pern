import './Control.scss';
import { SelectCurrency } from '../../../../features/SelectCurrency';
import { SelectCountry } from '../../../../features/SelectCountry';
import { Search } from '../../../../features/Search';
import { AccountTab } from '../../AccountTab/AccountTab';

export const Control = () => {
  return (
    <div className="Control">
      <Search />

      <SelectCurrency />

      <SelectCountry />

      <AccountTab />
    </div>
  );
};
