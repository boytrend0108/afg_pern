import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import './MiniSlider.scss';
import { useGetSliderWidth } from '../hooks/useGetSliderWidth';
import { useGetSliderHeight } from '../hooks/useGetSliderHeight';
import { PREVIEW_WIDTH } from '../consts';
import { PromoType } from '../../../../entities/ProductItem/types';
import { useAppSelector } from '../../../../shared/hooks/reduxHooks';
import { useLoadImage } from '../../../../shared/hooks';

type Props = {
  title: string;
  isShow?: boolean;
  promoType: PromoType;
};

export const MiniSlider: React.FC<Props> = ({
  title,
  isShow = false,
  promoType = 'Recomended',
}) => {
  const [image, setImage] = useState(0);
  const [show, setShow] = useState(isShow);
  const [sliderWidth, setSliderWidth] = useState(600);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const main = useRef<HTMLDivElement>(null);
  const drop = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const machine = useAppSelector((state) => state.product.product);
  const [preparedImages, setPreparedImages] = useState<string[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  useGetSliderWidth(setSliderWidth);
  useGetSliderHeight({ main, drop, show });
  useLoadImage(imageRef, setIsImageLoaded);

  const slide = (dir: 'left' | 'right') => {
    if (!slider.current) {
      return;
    }

    if (dir === 'right') {
      slider.current.scrollLeft += PREVIEW_WIDTH;
      setImage((current) => (current + 1) % preparedImages.length);
    } else {
      slider.current.scrollLeft -= PREVIEW_WIDTH;

      setImage(
        (current) =>
          (current - 1 + preparedImages.length) % preparedImages.length,
      );
    }
  };

  useEffect(() => {
    if (machine) {
      const images = machine.product_images;
      const mainImage = images.find((el) => el === machine.image);
      const set = new Set([mainImage, ...images]);

      // eslint-disable-next-line no-unused-expressions
      mainImage && setPreparedImages([...set] as string[]);
    }
  }, [machine]);

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

            <div className="MiniSlider__image-blur">
              <img
                loading="lazy"
                ref={imageRef}
                height={570}
                width={760}
                src={`${import.meta.env.VITE_API_BASE_URL}/api/thumbnail?id=${preparedImages[image]}`}
                className={cn('MiniSlider__image', {
                  'MiniSlider__image--loaded': isImageLoaded,
                })}
              />
            </div>
          </div>

          <div className="MiniSlider__slider-wr">
            <div
              ref={slider}
              className="MiniSlider__slider"
              style={{ width: sliderWidth + 'px' }}
            >
              <button
                className={cn('MiniSlider__btn MiniSlider__btn--left', {
                  'MiniSlider__btn--hidden': image === 0,
                })}
                onClick={() => slide('left')}
              />

              {preparedImages.map((img, i) => (
                <img
                  onClick={() => setImage(i)}
                  onMouseOver={() => setImage(i)}
                  key={i}
                  height={75}
                  width={100}
                  src={`${import.meta.env.VITE_API_BASE_URL}/api/thumbnail?id=${img}`}
                  className={cn('MiniSlider__preview', {
                    'MiniSlider__preview--active': i === image,
                  })}
                />
              ))}
              <button
                className={cn('MiniSlider__btn MiniSlider__btn--right', {
                  'MiniSlider__btn--hidden':
                    image === preparedImages.length - 1,
                })}
                disabled={image === preparedImages.length - 1}
                onClick={() => slide('right')}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
