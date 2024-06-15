import React, { useRef, useState } from 'react';
import cn from 'classnames';

import './MiniSlider.scss';
import { useGetSliderWidth } from '../hooks/useGetSliderWidth';
import { useGetSliderHeight } from '../hooks/useGetSliderHeight';
import { PREVIEW_WIDTH } from '../consts';
import { GOOGLE_DRIVE_URL } from '../../../../shared/consts/google';
import { PromoType } from '../../../../entities/ProductItem/types';

type Props = {
  images: string[];
  title: string;
  isShow?: boolean;
  promoType: PromoType;
};

export const MiniSlider: React.FC<Props> = ({
  images,
  title,
  isShow = false,
  promoType = 'Recomended',
}) => {
  const [image, setImage] = useState(0);
  const [show, setShow] = useState(isShow);
  const [sliderWidth, setSliderWidth] = useState(600);
  const main = useRef<HTMLDivElement>(null);
  const drop = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useGetSliderWidth(setSliderWidth);
  useGetSliderHeight({ main, drop, show });

  const slide = (dir: 'left' | 'right') => {
    if (!slider.current) {
      return;
    }

    if (dir === 'left') {
      slider.current.scrollLeft += PREVIEW_WIDTH;
    } else {
      slider.current.scrollLeft -= PREVIEW_WIDTH;
    }
  };

  return (
    <div className="MiniSlider">
      <header className="MiniSlider__header" onClick={() => setShow(!show)}>
        <p className="MiniSlider__title">{title}</p>
        <img
          src="/my-icons/arrow-up.svg"
          className={cn('MiniSlider__arrow', {
            'MiniSlider__arrow--closed': !show,
          })}
        />
      </header>

      <main className="MiniSlider__main" ref={main}>
        <div
          className={cn('MiniSlider__drop', {
            'MiniSlider__drop--hide': !show,
          })}
          ref={drop}
        >
          <div className="MiniSlider__image-box">
            <div
              className={cn('ProductItem__image-lable', {
                'ProductItem__image-lable--new': promoType === 'New',
                'ProductItem__image-lable--top': promoType === 'Top',
              })}
            >
              {promoType}
            </div>

            <img
              height={570}
              width={760}
              src={GOOGLE_DRIVE_URL + images[image]}
              className="MiniSlider__image"
            />
          </div>

          <div className="MiniSlider__slider-wr">
            <div
              ref={slider}
              className="MiniSlider__slider"
              style={{ width: sliderWidth + 'px' }}
            >
              <button
                className="MiniSlider__btn MiniSlider__btn--left"
                onClick={() => slide('left')}
              />
              {images.map((img, i) => (
                <img
                  onClick={() => setImage(i)}
                  key={i}
                  height={75}
                  width={100}
                  src={GOOGLE_DRIVE_URL + img}
                  className="MiniSlider__preview"
                />
              ))}
              <button
                className="MiniSlider__btn MiniSlider__btn--right"
                onClick={() => slide('right')}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
