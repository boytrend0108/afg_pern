import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './ui/App.tsx';

import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import RegistrationPage from '../pages/Registration';
import CatalogPage from '../pages/Catalog';
import ProfilePage from '../pages/Profile';
import BookingPage from '../pages/Booking';
import ProductPage from '../pages/ProductPage';
import RequestPage from '../pages/Request';
import NewsListPage from '../pages/NewsListPage';
import ContactPage from '../pages/Contact';
import NotFoundPage from '../pages/NotFound';
import NewsPage from '../pages/News';
import ActivationPage from '../pages/ActivationPage';
import AdminBrands from '../pages/Admin/AdminBrands';
import AdminCategories from '../pages/Admin/AdminCategories';
import AdminProducts from '../pages/Admin/AdminProducts';
import RequiredManagerRole from '../features/RequiredManagerRole';

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
