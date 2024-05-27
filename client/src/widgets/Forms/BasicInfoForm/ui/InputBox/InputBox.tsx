import React from 'react';
import './InputBox.scss';

type Props = {
  children?: React.ReactNode;
  value: string | number;
  setValue: (v: string | number) => void;
  title: string;
  subtitle: string;
  required: boolean;
  type?: 'text' | 'email' | 'number';
};

export const InputBox: React.FC<Props> = ({
  children,
  value,
  title,
  subtitle,
  required,
  setValue,
  type = 'text',
}) => {
  return (
    <div className="InputBox">
      <div className="InputBox__title">
        {title}
        <p className="InputBox__tip">{subtitle}</p>
      </div>

      {children || (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          className="InputBox__input"
          placeholder={title}
          required={required}
        />
      )}
    </div>
  );
};
