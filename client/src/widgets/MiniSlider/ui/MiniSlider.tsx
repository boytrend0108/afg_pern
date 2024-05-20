import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import './MiniSlider.scss';

type Props = {
  images: string[];
};

const RATIO = 0.9;

export const MiniSlider: React.FC<Props> = ({ images }) => {
  const [image, setImage] = useState(0);
  const [show, setShow] = useState(false);
  const main = useRef<HTMLDivElement>(null);
  const drop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (main.current) {
      if (!show) {
        setTimeout(() => {
          if (main.current) {
            main.current.style.height = '0px';
          }
        }, 0);
      } else {
        if (!drop.current) {
          return;
        }

        const width = drop.current.clientWidth;

        main.current.style.height = width * RATIO + 'px';
      }
    }
  }, [show]);

  return (
    <div className="MiniSlider">
      <header className="MiniSlider__header" onClick={() => setShow(!show)}>
        <p className="MiniSlider__title">General view</p>
        <img src="/my-icons/arrow-up.svg" />
      </header>

      <main className="MiniSlider__main" ref={main}>
        <div
          className={cn('MiniSlider__drop', {
            'MiniSlider__drop--hide': !show,
          })}
          ref={drop}
        >
          <div className="MiniSlider__image-box">
            <div className="MiniSlider__image-lable">NEW</div>
            <img
              src={`/product/${images[image]}.png`}
              className="MiniSlider__image"
            />
          </div>

          <div className="MiniSlider__slider">
            {images.map((img, i) => (
              <img
                onClick={() => setImage(i)}
                key={img}
                src={`/product/${img}.png`}
                className="MiniSlider__preview"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
