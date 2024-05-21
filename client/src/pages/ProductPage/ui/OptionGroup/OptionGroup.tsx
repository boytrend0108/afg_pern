import React from 'react';
import './OptionGroup.scss';

type OptionType = {
  [key: string]: string;
};

type Props = {
  title: string;
  options?: OptionType[];
};

export const OptionGroup: React.FC<Props> = ({ title, options }) => {
  return (
    <div className="OptionGroup">
      <p className="OptionGroup__title">{title}</p>

      <div className="OptionGroup__items">
        <div className="OptionGroup__item">
          <p className="OptionGroup__key">Type</p>
          <p className="OptionGroup__value">R934C</p>
        </div>
        <div className="OptionGroup__item">
          <p className="OptionGroup__key">Location</p>
          <p className="OptionGroup__value">Veldhoven, Netherlands</p>
        </div>
        <div className="OptionGroup__item">
          <p className="OptionGroup__key">Dutch Machine</p>
          <p className="OptionGroup__value">
            <img src="/my-icons/tick-gold.svg" alt="" />
          </p>
        </div>
        <div className="OptionGroup__item OptionGroup__item--desctiption">
          <p className="OptionGroup__key">Description</p>
          <p className="OptionGroup__value ">
            Available at Boss Machinery! This Liebherr R934C Excavator from 2008
            has an engine power of 150 kW and counts 12191 operational hours.
            Always worked in The Netherlands. The total weight of this Liebherr
            R934C is 31000 kg and the dimensions are 10.50 x 3.65 x 3.82.
          </p>
        </div>
      </div>
    </div>
  );
};
