import { MySocial } from '../../../../shared/ui';
import { Slider } from '../../../../widgets/ProductsSlider';
import { About } from '../About/About';
import { Banner } from '../Banner/Banner';
import { Categories } from '../Categories/ui/Categories';
import { FirstScreen } from '../FirstScreen/FirstScreen';
import { New } from '../New/New';
import './HomePage.scss';

export const HomePage = () => {
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

      <div className="HomePage__social">
        <MySocial />
      </div>

      <img
        src="/icons/whatsup.png"
        alt="whatsup"
        className="HomePage__whatsapp"
      />
    </div>
  );
};
