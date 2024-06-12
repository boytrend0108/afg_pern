import React, { ChangeEvent, useEffect, useState } from 'react';
import cn from 'classnames';

import './CatalogFilter.scss';
import { useSearchParams } from 'react-router-dom';
import { RANGE_WIDTH, SHIFT_SETS } from './consts';
import { setQueryParams } from './helpers';
import { useTranslation } from 'react-i18next';

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
  const [shiftLeft, setShiftLeft] = useState(0);
  const [shiftRight, setShiftRight] = useState(0);
  const [show, setShow] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const max = searchParams.get(`${id}-max`) || maxValue;
  const min = searchParams.get(`${id}-min`) || minValue;

  const handleSetMin = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (+value > +middleValue) {
      value = middleValue;
    }

    if (!value) {
      value = min;
    }

    setQueryParams(`${id}-min`, value, searchParams, setSearchParams);
  };

  const handleSetMax = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const reversedValue = (+maxValue + +middleValue - +value).toString();

    setQueryParams(`${id}-max`, reversedValue, searchParams, setSearchParams);
  };

  const resetFilter = () => {
    searchParams.delete(`${id}-min`);
    searchParams.delete(`${id}-max`);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const value =
      +min / ((+middleValue - +minValue) / RANGE_WIDTH) - SHIFT_SETS[id];

    setShiftLeft(value);
  }, [min]);

  useEffect(() => {
    const value =
      +max / ((+middleValue - +minValue) / RANGE_WIDTH) - 2 * RANGE_WIDTH - 20;

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
          <p className="CatalogFilter__title">{t(`CatalogPage.${title}`)}</p>
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
                <p className="CatalogFilter__input">{min}</p>
                {' - '}
                <p className="CatalogFilter__input">{max}</p>
              </div>

              <button className="CatalogFilter__btn" onClick={resetFilter}>
                Reset
              </button>
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
                  value={+maxValue + +middleValue - +max}
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
        {`#${id}.CatalogFilter__thumb--right::after {right: ${shiftRight}px`}
      </style>
    </>
  );
};
