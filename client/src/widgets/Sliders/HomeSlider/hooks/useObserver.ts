import React, { useEffect } from 'react';

export const useObserver = (
  setSlide: React.Dispatch<React.SetStateAction<string>>,
) => {
  useEffect(() => {
    const options = {
      root: document.querySelector('.Slider__box'),
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(callback, options);

    const targets = document.querySelectorAll('.Slider__item');

    targets.forEach((el) => observer.observe(el));

    function callback(entries: any) {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting && entry.target.dataset.slidenum) {
          setSlide(entry.target.dataset.slidenum);
        }
      });
    }
  }, []);
};
