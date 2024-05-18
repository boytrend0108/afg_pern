import { Link } from 'react-router-dom';
import { MyButton } from '../../../../shared/ui';
import './FirstScreen.scss';

export const FirstScreen = () => {
  return (
    <section className="FirstScreen">
      <div className="FirstScreen__main">
        <h1 className="FirstScreen__title">New Mini Excalarors</h1>

        <Link to="catalog?show=new" className="FirstScreen__button">
          <MyButton>View catalog</MyButton>
        </Link>
      </div>

      <div className="FirstScreen__side">
        <div className="FirstScreen__top">
          <h2 className="FirstScreen__title--mini">New machinery</h2>

          <Link to="catalog?show=new" className="FirstScreen__link">
            See all
          </Link>
        </div>

        <div className="FirstScreen__bottom">
          <h2 className="FirstScreen__title--mini">Used machinery</h2>

          <Link to="catalog?show=used" className="FirstScreen__link">
            See all
          </Link>
        </div>
      </div>
    </section>
  );
};
