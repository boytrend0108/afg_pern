import React, { ChangeEvent, useState } from 'react';
import './MyCheckbox.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  label: string;
  id: number;
};

export const MyCheckbox: React.FC<Props> = ({ label, id }) => {
  const [value, setValue] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const brandId = id.toString();
  const hanldeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);

    const query = new URLSearchParams(searchParams);

    if (!value) {
      query.append('brand', brandId);
      setSearchParams(query);
    } else {
      let brands = query.getAll('brand');

      brands = brands.filter((b) => b !== brandId);
      query.delete('brand');
      brands.forEach((br) => query.append('brand', br));
      setSearchParams(query);
    }
  };

  return (
    <div className="MyCheckbox">
      <label className="MyCheckbox__box" htmlFor={id.toString()}>
        {value && <img src="/my-icons/check.svg" alt={label} />}
      </label>

      <input
        id={id.toString()}
        type="checkbox"
        name="remember"
        className="MyCheckbox__input"
        hidden
        onChange={hanldeChange}
      />

      <label htmlFor={id.toString()} className="MyCheckbox__label">
        {label}
      </label>
    </div>
  );
};
