import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import './Slider.scss';
import { MyButton } from '../../../shared/ui';
import { changeSlide } from '../helpers/changeSlide';
import { useObserver } from '../hooks/useObserver';
import { useGetWidth } from '../../../shared/hooks/useGetWidth';

export const Slider: React.FC = () => {
  const [slide, setSlide] = useState('1');
  const [currentWidth, setCurrentWidth] = useState(0);

  useObserver(setSlide);
  useGetWidth(currentWidth, setCurrentWidth);

  useEffect(() => {
    changeSlide(slide);
  }, [slide]);

  return (
    <section className="Slider">
      <div className="Slider__box">
        <div
          className="Slider__item Slider__item--1"
          style={{
            minWidth: currentWidth,
          }}
          data-slidenum="1"
        >
          <h1 className="Slider__title">New Mini Excalarors</h1>
          <MyButton style={{ height: '48px', fontSize: '16px' }}>
            View catalog
          </MyButton>
        </div>

        <div
          className="Slider__item Slider__item--2"
          style={{ minWidth: currentWidth }}
          data-slidenum="2"
        >
          <h1 className="Slider__title">Used machinery</h1>
          <MyButton style={{ height: '48px', fontSize: '16px' }}>
            View catalog
          </MyButton>
        </div>

        <div
          className="Slider__item Slider__item--3"
          style={{ minWidth: currentWidth }}
          data-slidenum="3"
        >
          <h1 className="Slider__title">New machinery</h1>
          <MyButton style={{ height: '48px', fontSize: '16px' }}>
            View catalog
          </MyButton>
        </div>

        <nav
          className="Slider__nav"
          onClick={(e) => {
            const target = e.target as HTMLElement;

            if (target.dataset.slide) {
              setSlide((target as HTMLElement).dataset.slide as string);
            }
          }}
        >
          <div
            className={cn('Slider__nav-el', {
              'Slider__nav-el--active': slide === '1',
            })}
            data-slide="1"
          />
          <div
            className={cn('Slider__nav-el', {
              'Slider__nav-el--active': slide === '2',
            })}
            data-slide="2"
          />
          <div
            className={cn('Slider__nav-el', {
              'Slider__nav-el--active': slide === '3',
            })}
            data-slide="3"
          />
        </nav>
      </div>
    </section>
  );
};
