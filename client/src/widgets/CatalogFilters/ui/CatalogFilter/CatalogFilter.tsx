import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import './CatalogFilter.scss';
import { useSearchParams } from 'react-router-dom';
import { setQueryParams } from './helpers';
import { useTranslation } from 'react-i18next';
import { Slider } from '@mui/material';
import COLOR from '../../../../shared/consts/colors';

type Props = {
  minValue: string;
  maxValue: string;
  title: string;
  id: string;
  minDistance: number;
};

function valuetext(value: number) {
  return `${value}`;
}

export const CatalogFilter: React.FC<Props> = ({
  minValue,
  maxValue,
  title,
  id,
  minDistance,
}) => {
  const [show, setShow] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const [value, setValue] = React.useState<number[]>([+minValue, +maxValue]);

  const handleChange = (
    // eslint-disable-next-line no-shadow
    _event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      const newMinValue = Math.min(newValue[0], value[1] - minDistance);

      setValue([newMinValue, value[1]]);

      setQueryParams(
        id + '-min',
        newMinValue.toString(),
        searchParams,
        setSearchParams,
      );
    } else {
      const newMaxValue = Math.max(newValue[1], value[0] + minDistance);

      setValue([value[0], newMaxValue]);

      setQueryParams(
        id + '-max',
        newMaxValue.toString(),
        searchParams,
        setSearchParams,
      );
    }
  };

  const resetFilter = () => {
    searchParams.delete(`${id}-min`);
    searchParams.delete(`${id}-max`);
    setSearchParams(searchParams);
    setValue([+minValue, +maxValue]);
  };

  useEffect(() => {
    if (!searchParams.toString().includes(id)) {
      setValue([+minValue, +maxValue]);
    }
  }, [searchParams]);

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
                <p className="CatalogFilter__input">{value[0]}</p>
                {' - '}
                <p className="CatalogFilter__input">{value[1]}</p>
              </div>

              <button className="CatalogFilter__btn" onClick={resetFilter}>
                Reset
              </button>
            </div>

            <Slider
              getAriaLabel={() => 'Minimum distance'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
              max={+maxValue}
              min={+minValue}
              className="CatalogFilter__slider"
              sx={{
                color: '#d8c372',
                '& .MuiSlider-thumb': {
                  borderRadius: '1px',
                  color: COLOR.FILTER_THUBM_COLOR,
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
