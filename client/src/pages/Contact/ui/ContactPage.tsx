/* eslint-disable max-len */
import { SOCIAL_LINKS } from '../../../shared/consts/socialLink';
import { useScrollToTop } from '../../../shared/hooks';
import { MyContactInfo } from '../../../shared/ui/MyContactInfo/MyContactInfo';
import './ContactPage.scss';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
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
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kesklinna%20Street,%20Tallin,%20Estonia+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/">gps tracker sport</a>
        </iframe>
      </div>

      <div className="ContactPage__company">
        <h2 className="ContactPage__list-title">AFG Machinery</h2>

        <ul className="ContactPage__contacts">
          {/* <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Street')}</p>
            <p className="ContactPage__value">
              Kesklinna linnaosa Narvamt 7-636
            </p>
          </li> */}

          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Zipcode')}</p>
            <p className="ContactPage__value">1011 Tallin</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Country')}</p>
            <p className="ContactPage__value">Estonia</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">
              {t('ContactPage.Nearest airport')}
            </p>
            <p className="ContactPage__value">Tallinn Airport</p>
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

          {/* <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.VAT number')}</p>
            <p className="ContactPage__value">add vat number</p>
          </li> */}
        </ul>
      </div>

      <div className="ContactPage__bank">
        <h2 className="ContactPage__list-title">
          {t('sectionTitle.Bank details')}
        </h2>

        <ul className="ContactPage__contacts">
          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Bank name')}</p>
            <p className="ContactPage__value">PKO BANK</p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Bank address')}</p>
            <p className="ContactPage__value">
              Poland Warszawa ul. Pulawska 15
            </p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">IBAN EURO:</p>
            <p className="ContactPage__value">
              PL50 1020 2892 0000 5302 0907 3661
            </p>
          </li>

          <li className="ContactPage__contact">
            <p className="ContactPage__key">{t('ContactPage.Swiftcode')}</p>
            <p className="ContactPage__value">BPKOPLPW</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
