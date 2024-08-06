import React from 'react';
import cn from 'classnames';
import './OptionGroup.scss';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

type OptionType = {
  [key: string]: string | boolean | number;
};

type Props = {
  title: string;
  options: OptionType;
};

export const OptionGroup: React.FC<Props> = ({ title, options }) => {
  const entries = options && Object.entries(options);
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <div className="OptionGroup">
      <p className="OptionGroup__title">{t(`ProductPage.${title}`)}</p>

      <div className="OptionGroup__items">
        {entries &&
          entries.map(([key, value]) => (
            <div
              className={cn('OptionGroup__item', {
                'OptionGroup__item--description': key === 'Description',
              })}
              key={key}
            >
              <p className="OptionGroup__key">{t(`ProductPage.${key}`)}</p>
              {value === 'true' || value === 'false' ? (
                <p className="OptionGroup__value">
                  <img
                    src={`/my-icons/${value === 'true' ? 'tick-gold' : 'x-circle-fill'}.svg`}
                    alt=""
                  />
                </p>
              ) : key === 'Description' ? (
                <p className="OptionGroup__value">
                  {t(`ProductItem.description.${id}`)}
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
