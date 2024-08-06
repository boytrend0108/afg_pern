import { Link } from 'react-router-dom';
import './Navbar.scss';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="Navbar">
      <Link className="Navbar__link" to="/">
        {t('Header.Home')}
      </Link>

      <Link className="Navbar__link" to="catalog">
        {t('Header.Catalog')}
      </Link>

      {/* Temporarily hidden
      <Link className="Navbar__link" to="news">
        {t('Header.News')}
      </Link> 
      */}

      <Link className="Navbar__link" to="contact">
        {t('Header.Contact')}
      </Link>

      <Link className="Navbar__link" to="request">
        {t('Header.Leave a request')}
      </Link>
    </nav>
  );
};
