import { RefObject, useEffect } from 'react';

export const useLoadImage = (
  imageRef: RefObject<HTMLImageElement>,
  setIsImageLoaded: (v: boolean) => void,
) => {
  useEffect(() => {
    if (!imageRef) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    const showImage = () => {
      setIsImageLoaded(true);
    };

    if (imageRef.current?.complete) {
      showImage();
    }

    imageRef.current?.addEventListener('load', showImage);

    return () => {
      imageRef.current?.removeEventListener('load', showImage);
    };
  }, []);
};
