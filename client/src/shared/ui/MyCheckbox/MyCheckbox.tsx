import React, { ChangeEvent, useEffect, useState } from 'react';
import './MyCheckbox.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  label: string;
  id: number;
  searchItem: string;
};

export const MyCheckbox: React.FC<Props> = ({ label, id, searchItem }) => {
  const [value, setValue] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const brandId = id.toString();

  const hanldeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);

    const query = new URLSearchParams(searchParams);

    if (!value) {
      query.append(searchItem, brandId);
      setSearchParams(query);
    } else {
      let brands = query.getAll(searchItem);

      brands = brands.filter((b) => b !== brandId);
      query.delete(searchItem);
      brands.forEach((br) => query.append(searchItem, br));
      setSearchParams(query);
    }
  };

  useEffect(() => {
    if (searchParams.toString().includes(`${searchItem}=${id}`)) {
      setValue(true);

      return;
    }

    setValue(false);
  }, [searchParams]);

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
