import { SOCIAL_LINKS } from '../../consts/socialLink';
import './MyContactInfo.scss';
import { useTranslation } from 'react-i18next';

export const MyContactInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="MyContactInfo">
      <h2 className="MyContactInfo__title">{t('sectionTitle.Contact Info')}</h2>

      <ul className="MyContactInfo__contacts">
        <li className="MyContactInfo__contact">
          <img src="/my-icons/phone-black.svg" alt="phone" />
          <a href={`tel:${SOCIAL_LINKS.PHONE}`} target="blank">
            {SOCIAL_LINKS.PHONE}
          </a>
        </li>

        <li className="MyContactInfo__contact">
          <img src="/my-icons/phone-black.svg" alt="phone" />
          <a href={`tel:${SOCIAL_LINKS.PHONE}`} target="blank">
            {SOCIAL_LINKS.PHONE_2}
          </a>
        </li>

        <li className="MyContactInfo__contact">
          <img src="/my-icons/email-black.svg" alt="mail" />
          <a href={`mailto:${SOCIAL_LINKS.EMAIL}`} target="blank">
            {SOCIAL_LINKS.EMAIL}
          </a>
        </li>

        <li className="MyContactInfo__contact">
          <img src="/my-icons/whats-app-black.svg" alt="mail" />
          <a href={SOCIAL_LINKS.WHATSAPP} target="blank">
            AFGmachinery
          </a>
        </li>
      </ul>
    </div>
  );
};
