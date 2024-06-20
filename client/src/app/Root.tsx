import { lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './ui/App.tsx';

import { ActivationPage } from '../pages/ActivationPage';
import { AdminBrands } from '../pages/Admin/AdminBrands';
import { AdminCategories } from '../pages/Admin/AdminCategories';
import { AdminProducts } from '../pages/Admin/AdminProducts';
import { RequiredManagerRole } from '../features/RequiredManagerRole';

const ProfilePage = lazy(() => import('../pages/Profile'));
const BookingPage = lazy(() => import('../pages/Booking'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const CatalogPage = lazy(() => import('../pages/Catalog'));
const RegistrationPage = lazy(() => import('../pages/Registration'));
const LoginPage = lazy(() => import('../pages/Login'));
const RequestPage = lazy(() => import('../pages/Request'));
const NewsListPage = lazy(() => import('../pages/NewsListPage'));
const HomePage = lazy(() => import('../pages/Home'));
const ContactPage = lazy(() => import('../pages/Contact'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const NewsPage = lazy(() => import('../pages/News'));

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route
            path="activate/:activationToken"
            element={<ActivationPage />}
          />
          <Route path="product/:id">
            <Route index element={<ProductPage />} />
            <Route path="booking" element={<BookingPage />} />
          </Route>
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="news" element={<NewsListPage />} />
          <Route path="news/:id" element={<NewsPage />} />
          <Route path="request" element={<RequestPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<HomePage />} />
        </Route>

        <Route path="admin" element={<RequiredManagerRole />}>
          <Route path="brands" element={<AdminBrands />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
      </Routes>
    </Router>
  );
};
