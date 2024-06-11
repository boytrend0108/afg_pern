import { FormEvent, useState } from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { MyButton } from '../../shared/ui';
import { SOCIAL_LINKS } from '../../shared/consts/socialLink';
import { httpClient } from '../../app/configs/httpConfig';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // eslint-disable-next-line no-console
    httpClient
      .post('/subscribe', { email })
      .then(() => {
        setEmail('');
        setSuccessMsg(true);
      })
      .catch((err) => setError(err.message || 'Something went wrong...'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="Footer">
      <div className="Footer__container">
        <div className="Footer__item">
          <h3 className="Footer__item-title">{t('Header.Contact')}</h3>
          <p className="Footer__text">AFG-Machinery</p>
          <p className="Footer__text">Eindhovensebaan 3</p>
          <a
            href="tel:+31 40 253 22 45"
            className="Footer__text Footer__text--phone"
          >
            {SOCIAL_LINKS.PHONE}
          </a>

          <Link to="contact">
            <MyButton className="MyButton Footer__contact-btn">
              {t('buttons.Contact us')}
            </MyButton>
          </Link>
        </div>

        <div className="Footer__item Footer__item--social">
          <h3 className="Footer__item-title">{t('Footer.Social networks')}</h3>
          <a
            href={SOCIAL_LINKS.FB}
            className="Footer__social Footer__social--fb"
            target="blank"
          >
            Facebook
          </a>

          <a
            href={SOCIAL_LINKS.YOUTUBE}
            className="Footer__social Footer__social--youtube"
            target="blank"
          >
            Youtube
          </a>

          <a
            href={SOCIAL_LINKS.INST}
            className="Footer__social Footer__social--insta"
            target="blank"
          >
            Instagram
          </a>

          <a
            href={SOCIAL_LINKS.IN}
            className="Footer__social Footer__social--link"
            target="blank"
          >
            Linkedin
          </a>

          <a
            href={SOCIAL_LINKS.X}
            className="Footer__social Footer__social--x"
            target="blank"
          >
            Twitter
          </a>
        </div>

        <div className="Footer__item">
          <h3 className="Footer__item-title">{t('Footer.Machinery alert')}</h3>
          <p className="Footer__text">{t('Footer.alertDescr')}</p>

          <form
            action="#"
            className="Footer__form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="email"
              className="Footer__form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('form.emailPlaceholder')}
            />

            <button className="Footer__form-btn" type="submit">
              {loading ? 'In progress' : t('buttons.Subscribe')}
            </button>

            {error && <p className="Footer__form-err">{error}</p>}
            {successMsg && <p>Thank you for subscribing!</p>}
          </form>
        </div>

        <div className="Footer__item Footer__item--menu">
          <h3 className="Footer__item-title">Menu</h3>

          <Link className="Footer__navlink" to="/">
            {t('Header.Home')}
          </Link>

          <Link className="Footer__navlink" to="catalog">
            {t('Header.Catalog')}
          </Link>

          <Link className="Footer__navlink" to="news">
            {t('Header.News')}
          </Link>

          <Link className="Footer__navlink" to="contact">
            {t('Header.Contact')}
          </Link>
        </div>

        <Link to="/" className="Footer__item Footer__item--logo">
          <img src="/logo.svg" alt="logo" className="Footer__logo" />
        </Link>
      </div>
    </div>
  );
};
