import { Link } from 'react-router-dom';
import { MyButton } from '../../../../shared/ui';
import { useTranslation } from 'react-i18next';

import './FirstScreen.scss';

export const FirstScreen = () => {
  const { t } = useTranslation();

  return (
    <section className="FirstScreen">
      <div className="FirstScreen__main">
        <div className="FirstScreen__video-container">
          <div className="FirstScreen__video-cover" />

          <video
            autoPlay={true}
            loop={true}
            muted={true}
            className="FirstScreen__video"
            src="video.mp4"
            poster="home-page/tablet/slide-1.webp"
          />
        </div>

        <div className="FirstScreen__text-box">
          <h1 className="FirstScreen__title">
            {t('sectionTitle.A technique that gives')}{' '}
            <span>{t('sectionTitle.great opportunities')} </span>
          </h1>

          <Link to="catalog?show=new" className="FirstScreen__button">
            <MyButton>{t('FirstScreen.view catalog')}</MyButton>
          </Link>
        </div>
      </div>
    </section>
  );
};
