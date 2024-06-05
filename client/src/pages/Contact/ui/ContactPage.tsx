/* eslint-disable max-len */
import { SOCIAL_LINKS } from '../../../shared/consts/socialLink';
import { useScrollToTop } from '../../../shared/hooks';
import { MyContactInfo } from '../../../shared/ui/MyContactInfo/MyContactInfo';
import './ContactPage.scss';

export const ContactPage = () => {
  useScrollToTop();

  return (
    <div className="ContactPage my-container">
      <h1 className="ContactPage__title">Contact</h1>

      <div className="ContactPage__info">
        <MyContactInfo />
      </div>

      <div className="ContactPage__cart">
        <iframe
          height="100%"
          width="100%"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Hreshatic%20Street,%20Kiev,%20Ukraine+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps tracker sport</a>
        </iframe>
      </div>

      <div className="ContactPage__company">
        <h2 className="ContactPage__list-title">AFG Machinery</h2>

        <ul className="ContactPage__contacts">
          <li className="ContactPage__contact">
            <p className="ContactPage__key">Street</p>
            <p className="ContactPage__value">Some street</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">Zipcode</p>
            <p className="ContactPage__value">30800 Kiev Ukraine</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">Country</p>
            <p className="ContactPage__value"> add country</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">Nearest airport</p>
            <p className="ContactPage__value"> add Airport</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">phone</p>
            <a
              className="ContactPage__value"
              href={`tel:${SOCIAL_LINKS.PHONE}`}
              target="blank"
            >
              {SOCIAL_LINKS.PHONE}
            </a>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">Email</p>

            <a
              className="ContactPage__value"
              href={`mailto:${SOCIAL_LINKS.EMAIL}`}
              target="blank"
            >
              {SOCIAL_LINKS.EMAIL}
            </a>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">VAT number</p>
            <p className="ContactPage__value">add vat number</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">Chamber of Commerce no.</p>
            <p className="ContactPage__value">
              5290041, located in Ukraine, The Netherlands
            </p>
          </li>
        </ul>
      </div>

      <div className="ContactPage__bank">
        <h2 className="ContactPage__list-title">Bank details</h2>

        <ul className="ContactPage__contacts">
          <li className="ContactPage__contact">
            <p className="ContactPage__key">Bank Name:</p>
            <p className="ContactPage__value">Universal</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">Bank Address:</p>
            <p className="ContactPage__value">
              Horst 18 5501 DN Veldhoven The Netherlands
            </p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">IBAN EURO:</p>
            <p className="ContactPage__value"> NL65ABNA0417047495</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">Swiftcode:</p>
            <p className="ContactPage__value"> add code</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">IBAN USD:</p>
            <p className="ContactPage__value">NL13ABNA0886560926</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">Swiftcode:</p>
            <p className="ContactPage__value"> add code</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
