import React from 'react';
import './InputBox.scss';

type Props = {
  children?: React.ReactNode;
  value: string;
  setValue: (v: string) => void;
  title: string;
  subtitle: string;
  required: boolean;
  type?: 'text' | 'email';
};

export const InputBox: React.FC<Props> = ({
  children,
  value,
  setValue,
  title,
  subtitle,
  required,
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
