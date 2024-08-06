/* eslint-disable max-len */
import React, { useRef, useState } from 'react';
import cn from 'classnames';
import '@google/model-viewer';

import './Model3D.scss';
// import { useAppSelector } from '../../../shared/hooks/reduxHooks';

type Props = {
  title: string;
  isShow?: boolean;
};

const Model3D: React.FC<Props> = ({ title, isShow = false }) => {
  const [show, setShow] = useState(isShow);
  // const [isImageLoaded, setIsImageLoaded] = useState(false);
  const main = useRef<HTMLDivElement>(null);
  const drop = useRef<HTMLDivElement>(null);
  // const machine = useAppSelector((state) => state.product.product);
  // const [preparedImages, setPreparedImages] = useState<string[]>([]);
  // const imageRef = useRef<HTMLImageElement>(null);

  // useLoadImage(imageRef, setIsImageLoaded);

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
            {/* <div className="MiniSlider__image-blur"> */}
            {/* <model-viewer
              src="/models3D/1.glb"
              alt="A 3D model"
              auto-rotate
              camera-controls
            ></model-viewer> */}
            {/* </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Model3D;
