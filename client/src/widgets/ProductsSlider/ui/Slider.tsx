import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import './Slider.scss';
import { MyButton } from '../../../shared/ui';

export const Slider: React.FC = () => {
  const [slide, setSlide] = useState('1');
  const [shift, setShift] = useState(0);
  const [currentWidth, setCurrentWidsh] = useState(0);

  const changeShift = () => {
    setShift(+slide * currentWidth);
  };

  useEffect(() => {
    changeShift();
  }, [slide]);

  useEffect(() => {
    const getWidth = () => {
      setCurrentWidsh(window.innerWidth);
    };

    getWidth();
    changeShift();

    window.addEventListener('resize', getWidth);

    return () => {
      window.removeEventListener('resize', getWidth);
    };
  }, [currentWidth]);

  return (
    <section className="Slider">
      <div
        className="Slider__box"
        style={{ transform: `translateX(-${shift}px)` }}
      >
        <div
          className="Slider__item Slider__item--1"
          style={{ width: currentWidth }}
        >
          <h1 className="Slider__title">New Mini Excalarors</h1>
          <MyButton style={{ height: '48px', fontSize: '16px' }}>
            View catalog
          </MyButton>
        </div>

        <div
          className="Slider__item Slider__item--2"
          style={{ width: currentWidth }}
        >
          <h1 className="Slider__title">Used machinery</h1>
          <MyButton style={{ height: '48px', fontSize: '16px' }}>
            View catalog
          </MyButton>
        </div>

        <div
          className="Slider__item Slider__item--3"
          style={{ width: currentWidth }}
        >
          <h1 className="Slider__title">New machinery</h1>
          <MyButton style={{ height: '48px', fontSize: '16px' }}>
            View catalog
          </MyButton>
        </div>
      </div>

      <nav
        className="Slider__nav"
        onClick={(e) =>
          setSlide((e.target as HTMLElement).dataset.slide as string)
        }
      >
        <div
          className={cn('Slider__nav-el', {
            'Slider__nav-el--active': slide === '0',
          })}
          data-slide="0"
        />
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
      </nav>
    </section>
  );
};
