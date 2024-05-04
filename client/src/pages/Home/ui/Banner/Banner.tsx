import { MyButton } from '../../../../shared/ui';
import './Banner.scss';

export const Banner = () => {
  return (
    <div className="Banner">
      <div className="Banner__container">
        <img
          src="/home-page/pile-banner-left.png"
          alt="pile drivers"
          className="Banner__img Banner__img--left"
        />

        <main className="Banner__main">
          <h2 className="Banner__title">pile drivers</h2>
          <p className="Banner__desc">
            Machine for pile driving into the ground by static force
            transmission method
          </p>

          <MyButton className="Banner__btn MyButton">View models</MyButton>
        </main>

        <img
          src="/home-page/pile-banner-right.png"
          alt="pile drivers"
          className="Banner__img"
        />
      </div>
    </div>
  );
};
