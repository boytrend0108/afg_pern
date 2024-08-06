export const changeSlide = (slideNum: string) => {
  const currentSlide = document.querySelector(`.Slider__item--${slideNum}`);

  currentSlide?.scrollIntoView({
    behavior: 'smooth',
    inline: 'start',
    block: 'center',
  });
};
