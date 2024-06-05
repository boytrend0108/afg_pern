import { SOCIAL_LINKS } from '../../consts/socialLink';
import './MyContactInfo.scss';

export const MyContactInfo = () => {
  return (
    <div className="MyContactInfo">
      <h2 className="MyContactInfo__title">Contact Info</h2>

      <ul className="MyContactInfo__contacts">
        <li className="MyContactInfo__contact">
          <img src="/my-icons/phone-black.svg" alt="phone" />
          <a href={`tel:${SOCIAL_LINKS.PHONE}`}>+31 40 253 22 45</a>
        </li>
        <li className="MyContactInfo__contact">
          <img src="/my-icons/email-black.svg" alt="mail" />
          <a href={`mailto:${SOCIAL_LINKS.EMAIL}`}>afg.machin@gmail.com</a>
        </li>
        <li className="MyContactInfo__contact">
          <img src="/my-icons/whats-app-black.svg" alt="mail" />
          <a href={SOCIAL_LINKS.WHATSAPP}>AFGmachinery</a>
        </li>
      </ul>
    </div>
  );
};
