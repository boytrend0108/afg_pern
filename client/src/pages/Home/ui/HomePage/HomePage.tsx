import { MySocial } from '../../../../shared/ui';
import { Slider } from '../../../../widgets/ProductsSlider';
import { FirstScreen } from '../FirstScreen/FirstScreen';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="HomePage">
      <FirstScreen />
      <Slider />

      <div className="HomePage__social">
        <MySocial />
      </div>
    </div>
  );
};
