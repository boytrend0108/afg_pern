import React, { useRef, useState } from 'react';
import cn from 'classnames';

import './MiniSliderMobile.scss';
import { PREVIEW_WIDTH } from '../consts';
import { GOOGLE_DRIVE_URL } from '../../../../shared/consts/google';
import { PromoType } from '../../../../entities/ProductItem/types';

type Props = {
  images: string[];
  promoType: PromoType;
};

export const MiniSliderMobile: React.FC<Props> = ({ images, promoType }) => {
  const [image, setImage] = useState(0);
  const main = useRef<HTMLDivElement>(null);
  const drop = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

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
    <div className="MiniSliderMobile">
      <main className="MiniSliderMobile__main" ref={main}>
        <div className={cn('MiniSliderMobile__drop')} ref={drop}>
          <div className="MiniSliderMobile__image-box">
            <div
              className={cn('ProductItem__image-lable', {
                'ProductItem__image-lable--new': promoType === 'New',
                'ProductItem__image-lable--top': promoType === 'Top',
              })}
            >
              {promoType}
            </div>

            <img
              src={GOOGLE_DRIVE_URL + images[image] + '&sz=w760&sz=h570'}
              height={420}
              width={728}
              className="MiniSliderMobile__image"
            />
          </div>

          <div className="MiniSliderMobile__slider-wr">
            <div ref={slider} className="MiniSliderMobile__slider">
              <button
                className="MiniSliderMobile__btn MiniSliderMobile__btn--left"
                onClick={() => slide('left')}
              />
              {images.map((img, i) => (
                <img
                  onClick={() => setImage(i)}
                  key={i}
                  height={75}
                  width={100}
                  src={GOOGLE_DRIVE_URL + img}
                  className="MiniSliderMobile__preview"
                />
              ))}
              <button
                className="MiniSliderMobile__btn MiniSliderMobile__btn--right"
                onClick={() => slide('right')}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
