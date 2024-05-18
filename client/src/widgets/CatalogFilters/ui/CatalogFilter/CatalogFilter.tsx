import React, { ChangeEvent, useEffect, useState } from 'react';
import cn from 'classnames';

import './CatalogFilter.scss';
import { useSearchParams } from 'react-router-dom';
import { RANGE_WIDTH, SHIFT_SETS } from './consts';
import { setQueryParams } from './helpers';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetMin = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (+value > +middleValue) {
      value = middleValue;
    }

    if (!value) {
      value = min;
    }

    setMin(value);
    setQueryParams(`${id}-min`, value, searchParams, setSearchParams);
  };

  const handleSetMax = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setMax(value);
    setQueryParams(`${id}-max`, value, searchParams, setSearchParams);
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
      case 'price':
        setShiftRight(-value);
        break;
      case 'hours':
        setShiftRight((-value + 55) * 0.8);
        break;
      case 'year':
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
                  onChange={handleSetMax}
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
                  onChange={handleSetMin}
                  className="CatalogFilter__range-item"
                />
              </div>

              <div id={id} className="CatalogFilter__thumb--right">
                <input
                  type="range"
                  min={middleValue}
                  max={maxValue}
                  value={max}
                  onChange={handleSetMax}
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
