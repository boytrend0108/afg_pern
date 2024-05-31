import React from 'react';
import './OptionGroup.scss';
import { useAppSelector } from '../../../../shared/hooks/reduxHooks';
import { getOptions } from './helpers/getOptions';

type OptionType = {
  [key: string]: string;
};

type Props = {
  title: string;
  options?: OptionType[];
};

export const OptionGroup: React.FC<Props> = ({ title }) => {
  const { product } = useAppSelector((state) => state.product);

  const options = product?.product_infos && getOptions(product?.product_infos);

  return (
    <div className="OptionGroup">
      <p className="OptionGroup__title">{title}</p>

      <div className="OptionGroup__items">
        <div className="OptionGroup__item">
          <p className="OptionGroup__key">Type</p>
          <p className="OptionGroup__value">{options?.type}</p>
        </div>

        <div className="OptionGroup__item">
          <p className="OptionGroup__key">Location</p>
          <p className="OptionGroup__value">{options?.location}</p>
        </div>

        <div className="OptionGroup__item">
          <p className="OptionGroup__key">Dutch Machine</p>
          <p className="OptionGroup__value">
            <img src="/my-icons/tick-gold.svg" alt="" />
          </p>
        </div>

        <div className="OptionGroup__item OptionGroup__item--desctiption">
          <p className="OptionGroup__key">Description</p>
          <p className="OptionGroup__value ">{options?.descriptions}</p>
        </div>
      </div>
    </div>
  );
};
