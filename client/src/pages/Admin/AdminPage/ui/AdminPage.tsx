import { Link, useNavigate } from 'react-router-dom';
import './AdminPage.scss';

import { Button } from 'react-bootstrap';
import React from 'react';
import { useAppDispatch } from '../../../../shared/hooks/reduxHooks';
import { user } from '../../../../entities/User';
type Props = {
  children: React.ReactNode;
};

export const AdminPage: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(user.logout());
  };

  return (
    <div className="AdminPage">
      <header className="AdminPage__header">
        <div className="my-container">
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

            <Button variant="warning" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="AdminPage__main my-container">{children}</main>
    </div>
  );
};
