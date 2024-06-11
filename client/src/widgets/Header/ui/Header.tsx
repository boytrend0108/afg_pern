import { Link } from 'react-router-dom';

import './Header.scss';
import '../../../shared/ui/MyFlags/ui/MyFlags.scss';
import { Navbar } from './Navbar/Navbar';
import { Control } from './Control/Control';

export const Header = () => {
  return (
    <header className="Header">
      <div className="Header__container">
        <div className="Header__content">
          <Link to="/" className="Header__logo">
            <img
              src="/logo.svg"
              alt="logo"
              className="Header__logo-img"
              height={55}
              width={75}
            />
          </Link>

          <Navbar />

          <Control />
        </div>
      </div>
    </header>
  );
};
