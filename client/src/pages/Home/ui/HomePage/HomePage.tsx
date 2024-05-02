import { MySocial } from '../../../../shared/ui';
import { Slider } from '../../../../widgets/ProductsSlider';
import { Categories } from '../Categories/ui/Categories';
import { FirstScreen } from '../FirstScreen/FirstScreen';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="HomePage">
      <FirstScreen />
      <Slider />
      <Categories />

      <div className="HomePage__social">
        <MySocial />
      </div>

      <div className="HomePage__whatsup">
        <img src="/icons/whatsup.png" alt="whatsup" />
      </div>
    </div>
  );
};
