/* eslint-disable max-len */
import { SOCIAL_LINKS } from '../../../shared/consts/socialLink';
import { useScrollToTop } from '../../../shared/hooks';
import { MyContactInfo } from '../../../shared/ui/MyContactInfo/MyContactInfo';
import './ContactPage.scss';
import { useTranslation } from 'react-i18next';

export const ContactPage = () => {
  useScrollToTop();

  const { t } = useTranslation();

  return (
    <div className="ContactPage my-container">
      <h1 className="ContactPage__title">{t('sectionTitle.Contacts')}</h1>

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
            <p className="ContactPage__key">{t('ContactPage.Street')}</p>
            <p className="ContactPage__value">Some street</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Zipcode')}</p>
            <p className="ContactPage__value">30800 Kiev Ukraine</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Country')}</p>
            <p className="ContactPage__value"> add country</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">
              {t('ContactPage.Nearest airport')}
            </p>
            <p className="ContactPage__value"> add Airport</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Phone')}</p>
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
            <p className="ContactPage__key">{t('ContactPage.VAT number')}</p>
            <p className="ContactPage__value">add vat number</p>
          </li>
        </ul>
      </div>

      <div className="ContactPage__bank">
        <h2 className="ContactPage__list-title">
          {t('sectionTitle.Bank details')}
        </h2>

        <ul className="ContactPage__contacts">
          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Bank name')}</p>
            <p className="ContactPage__value">Universal</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Bank address')}</p>
            <p className="ContactPage__value">
              Horst 18 5501 DN Veldhoven The Netherlands
            </p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">IBAN EURO:</p>
            <p className="ContactPage__value"> NL65ABNA0417047495</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Swiftcode')}</p>
            <p className="ContactPage__value"> add code</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">IBAN USD:</p>
            <p className="ContactPage__value">NL13ABNA0886560926</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Swiftcode')}</p>
            <p className="ContactPage__value"> add code</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
