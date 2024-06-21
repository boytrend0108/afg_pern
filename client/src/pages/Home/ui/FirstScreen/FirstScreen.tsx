import { Link } from 'react-router-dom';
import { MyButton } from '../../../../shared/ui';
import { useTranslation } from 'react-i18next';

import './FirstScreen.scss';

export const FirstScreen = () => {
  const { t } = useTranslation();

  return (
    <section className="FirstScreen">
      <div className="FirstScreen__main">
        <h1 className="FirstScreen__title">
          {t('FirstScreen.New Mini Excavators')}
        </h1>

        <Link to="catalog?show=new" className="FirstScreen__button">
          <MyButton>{t('FirstScreen.view catalog')}</MyButton>
        </Link>
      </div>

      <div className="FirstScreen__side">
        <Link to="catalog?show=new">
          <div className="FirstScreen__top">
            <h2 className="FirstScreen__title--mini">
              {t('FirstScreen.New machinery')}
            </h2>

            <p className="FirstScreen__link">{t('FirstScreen.See all')}</p>
          </div>
        </Link>

        <Link to="catalog?show=used">
          <div className="FirstScreen__bottom">
            <h2 className="FirstScreen__title--mini">
              {t('FirstScreen.Used machinery')}
            </h2>

            <p className="FirstScreen__link">{t('FirstScreen.See all')}</p>
          </div>
        </Link>
      </div>
    </section>
  );
};
