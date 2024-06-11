import './About.scss';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();

  return (
    <div className="About">
      <div className="About__container">
        <h2 className="About__title">{t('About.title')}</h2>

        <p className="About__desc">{t('About.description')}</p>
        <p className="About__desc">{t('About.description1')}</p>
      </div>
    </div>
  );
};
