import { SOCIAL_LINKS } from '../../../../shared/consts/socialLink';
import { useScrollToTop } from '../../../../shared/hooks';
import { About } from '../About/About';
import { Banner } from '../Banner/Banner';
import { Categories } from '../Categories/ui/Categories';
import { FirstScreen } from '../FirstScreen/FirstScreen';
import { New } from '../New/ui/New';
import './HomePage.scss';

const HomePage = () => {
  useScrollToTop();

  return (
    <div className="HomePage">
      <FirstScreen />
      <Categories />

      <div className="HomePage__banner">
        <Banner />
      </div>

      <New />

      <div className="HomePage__about">
        <About />
      </div>

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

export default HomePage;
