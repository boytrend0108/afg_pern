import { SOCIAL_LINKS } from '../../../../shared/consts/socialLink';
import './ContactUs.scss';

export const ContactUs = () => {
  return (
    <div className="ContactUs">
      <div className="ContactUs__top">
        <p className="ContactUs__title">Contact Us</p>

        <p className="ContactUs__subtitle">
          If you are interested in a particular model or need help
        </p>
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
