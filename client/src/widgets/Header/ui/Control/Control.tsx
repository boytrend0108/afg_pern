import './Control.scss';
// import { SelectCurrency } from '../../../../features/SelectCurrency';
import { SelectCountry } from '../../../../features/SelectCountry';
import { Search } from '../../../../features/Search';
import { AccountTab } from '../AccountTab/AccountTab';
import { useLocation } from 'react-router-dom';

export const Control = () => {
  const { pathname } = useLocation();

  return (
    <div className="Control">
      {pathname !== '/catalog' && <Search />}

      {/* Temporarily hidden
      <SelectCurrency /> 
      */}

      <SelectCountry />

      <AccountTab />
    </div>
  );
};
