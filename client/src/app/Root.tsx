import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './ui/App.tsx';
import { HomePage } from '../pages/Home';
import { ContactPage } from '../pages/Contact';
import { NewsListPage } from '../pages/NewsListPage';
import { RequestPage } from '../pages/Request';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/Registration';
import { CatalogPage } from '../pages/Catalog';
import { ProductPage } from '../pages/ProductPage';
import { BookingPage } from '../pages/Booking';
import { ProfilePage } from '../pages/Profile';
import { NewsPage } from '../pages/News';
import { ActivationPage } from '../pages/ActivationPage';
import { AdminPage } from '../pages/Admin/AdminPage';
import { AdminBrands } from '../pages/Admin/AdminBrands';
import { AdminCategories } from '../pages/Admin/AdminCategories';
import { AdminProducts } from '../pages/Admin/AdminProducts';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
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

        <Route path="admin" element={<AdminPage />}>
          <Route path="brands" element={<AdminBrands />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
      </Routes>
    </Router>
  );
};
