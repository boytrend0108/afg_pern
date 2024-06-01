import React, { useRef, useState } from 'react';
import cn from 'classnames';

import './MiniSliderMobile.scss';
import { PREVIEW_WIDTH } from '../consts';
import { GOOGLE_DRIVE_URL } from '../../../../shared/consts/google';

type Props = {
  images: string[];
};

export const MiniSliderMobile: React.FC<Props> = ({ images }) => {
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
            <div className="MiniSliderMobile__image-lable">NEW</div>
            <img
              src={GOOGLE_DRIVE_URL + images[image]}
              height={420}
              width={728}
              crossOrigin="anonymous"
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
                  key={img}
                  height={75}
                  width={100}
                  crossOrigin="anonymous"
                  src={GOOGLE_DRIVE_URL + images[image]}
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
