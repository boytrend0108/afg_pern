import { SOCIAL_LINKS } from '../../../../shared/consts/socialLink';
import './ContactUs.scss';
import { useTranslation } from 'react-i18next';

export const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div className="ContactUs">
      <div className="ContactUs__top">
        <p className="ContactUs__title">{t('ContactUs.title')}</p>

        <p className="ContactUs__subtitle">{t('ContactUs.subtitle')}</p>
      </div>

      <div className="ContactUs__contacts">
        <a
          className="ContactUs__contact ContactUs__contact--phone"
          href={`tel:${SOCIAL_LINKS.PHONE}`}
          target="blank"
        >
          {SOCIAL_LINKS.PHONE}
        </a>

        <a
          href={`mailto:${SOCIAL_LINKS.EMAIL}`}
          className="ContactUs__contact ContactUs__contact--mail"
          target="blank"
        >
          {SOCIAL_LINKS.EMAIL}
        </a>

        <a
          href={SOCIAL_LINKS.WHATSAPP}
          className="ContactUs__contact ContactUs__contact--whatsapp"
          target="blank"
        >
          AFGMachinery
        </a>
      </div>
    </div>
  );
};
