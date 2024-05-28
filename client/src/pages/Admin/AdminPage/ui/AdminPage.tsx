import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminPage.scss';

import { Button } from 'react-bootstrap';

export const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="AdminPage">
      <header className="AdminPage__header">
        <div className="container">
          <div className="Header__content">
            <Link to="/" className="Header__logo">
              <img src="/logo.svg" alt="logo" className="Header__logo-img" />
            </Link>

            <div className="AdminPage__buttons">
              <Button variant="dark" onClick={() => navigate('roles')}>
                Roles
              </Button>
              <Button variant="dark" onClick={() => navigate('brands')}>
                Brands
              </Button>
              <Button variant="dark" onClick={() => navigate('categories')}>
                Categories
              </Button>
              <Button variant="dark" onClick={() => navigate('products')}>
                Products
              </Button>
            </div>

            <Button variant="warning" onClick={() => navigate('products')}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="AdminPage__main container">
        <Outlet />
      </main>
    </div>
  );
};
