import React from 'react';
import './OptionGroup.scss';

type OptionType = {
  [key: string]: string | boolean | number;
};

type Props = {
  title: string;
  options: OptionType;
};

export const OptionGroup: React.FC<Props> = ({ title, options }) => {
  const entries = options && Object.entries(options);

  return (
    <div className="OptionGroup">
      <p className="OptionGroup__title">{title}</p>

      <div className="OptionGroup__items">
        {entries &&
          entries.map(([key, value]) => (
            <div className="OptionGroup__item" key={key}>
              <p className="OptionGroup__key">{key}</p>
              {value === 'true' || value === 'false' ? (
                <p className="OptionGroup__value">
                  <img
                    src={`/my-icons/${value === 'true' ? 'tick-gold' : 'x-circle-fill'}.svg`}
                    alt=""
                  />
                </p>
              ) : (
                <p className="OptionGroup__value">{value}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
