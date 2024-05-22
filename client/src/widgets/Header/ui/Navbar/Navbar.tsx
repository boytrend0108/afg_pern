import { Link } from 'react-router-dom';
import './Navbar.scss';

export const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link className="Navbar__link" to="/">
        Home
      </Link>

      <Link className="Navbar__link" to="catalog">
        Catalog
      </Link>

      <Link className="Navbar__link" to="news">
        News
      </Link>

      <Link className="Navbar__link" to="contact">
        Contact
      </Link>

      <Link className="Navbar__link" to="request">
        Leave a request
      </Link>
    </nav>
  );
};
