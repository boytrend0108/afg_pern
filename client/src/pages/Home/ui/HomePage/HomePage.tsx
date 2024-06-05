import { SOCIAL_LINKS } from '../../../../shared/consts/socialLink';
import { useScrollToTop } from '../../../../shared/hooks';
import { Slider } from '../../../../widgets/Sliders/HomeSlider';
import { About } from '../About/About';
import { Banner } from '../Banner/Banner';
import { Categories } from '../Categories/ui/Categories';
import { FirstScreen } from '../FirstScreen/FirstScreen';
import { New } from '../New/New';
import './HomePage.scss';

export const HomePage = () => {
  useScrollToTop();

  return (
    <div className="HomePage">
      <FirstScreen />
      <Slider />
      <Categories />

      <div className="HomePage__banner">
        <Banner />
      </div>

      <New />
      <About />

      <a href={SOCIAL_LINKS.WHATSAPP} target="blank">
        <img
          src="/my-icons/whatsup.png"
          alt="whatsup"
          className="HomePage__whatsapp"
        />
      </a>
    </div>
  );
};
