import React, { ChangeEvent, useEffect, useState } from 'react';
import cn from 'classnames';

import './CatalogFilter.scss';

const RANGE_WIDTH = 130;
const SHIFT_SETS = {
  Price: 0,
  Mileage: 0,
  Hours: 25,
  Year: 21660,
};

type Props = {
  minValue: string;
  maxValue: string;
  title: string;
  id: string;
  middleValue: string;
};

export const CatalogFilter: React.FC<Props> = ({
  minValue,
  maxValue,
  middleValue,
  title,
  id,
}) => {
  const [min, setMin] = useState(minValue);
  const [max, setMax] = useState(maxValue);
  const [shiftLeft, setShiftLeft] = useState(0);
  const [shiftRight, setShiftRight] = useState(0);
  const [show, setShow] = useState(true);

  const handleSetMin = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (+value > +max / 2) {
      value = `${+max / 2}`;
    }

    if (!value) {
      value = min;
    }

    setMin(value);
  };

  useEffect(() => {
    const value =
      +min / ((+middleValue - +minValue) / RANGE_WIDTH) - SHIFT_SETS[id];

    setShiftLeft(value);
  }, [min]);

  useEffect(() => {
    const value =
      +max / ((+middleValue - +minValue) / RANGE_WIDTH) - 2 * RANGE_WIDTH - 5;

    switch (id) {
      case 'Price':
        setShiftRight(-value);
        break;
      case 'Hours':
        setShiftRight((-value + 55) * 0.8);
        break;
      case 'Year':
        setShiftRight(-value + 21660);
        break;
      default:
        setShiftRight(-value);
        break;
    }
  }, [max]);

  return (
    <>
      <div className="CatalogFilter">
        <div className="CatalogFilter__header">
          <p className="CatalogFilter__title">{title}</p>
          <img
            src="/my-icons/arrow-up.svg"
            className={cn('CatalogFilter__arrow', {
              'CatalogFilter__arrow--closed': !show,
            })}
            alt="arrow"
            onClick={() => setShow(!show)}
          />
        </div>

        <div
          className={cn('CatalogFilter__main', {
            'CatalogFilter__main--closed': !show,
          })}
        >
          <div
            className={cn('CatalogFilter__drop', {
              'CatalogFilter__drop--closed': !show,
            })}
          >
            <div className="CatalogFilter__inputs">
              <div className="CatalogFilter__inputs-wr">
                <input
                  type="text"
                  className="CatalogFilter__input"
                  value={+min}
                  onChange={handleSetMin}
                />
                {' - '}
                <input
                  type="number"
                  className="CatalogFilter__input"
                  value={+middleValue + +maxValue - +max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>

              <button className="CatalogFilter__btn">Accept</button>
            </div>

            <div className="CatalogFilter__range">
              <div id={id} className="CatalogFilter__thumb--left">
                <input
                  type="range"
                  min={minValue}
                  max={middleValue}
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="CatalogFilter__range-item"
                />
              </div>

              <div id={id} className="CatalogFilter__thumb--right">
                <input
                  type="range"
                  min={middleValue}
                  max={maxValue}
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="CatalogFilter__range-item--right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`#${id}.CatalogFilter__thumb--left::after {left: ${shiftLeft}px`}
      </style>

      <style>
        {`#${id}.CatalogFilter__thumb--right::after {left: ${shiftRight}px`}
      </style>
    </>
  );
};
