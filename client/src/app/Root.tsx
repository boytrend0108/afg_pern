import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './ui/App.tsx';
import { HomePage } from '../pages/Home';
import { CategoryPage } from '../pages/Category';
import { ContactPage } from '../pages/Contact';
import { NewsPage } from '../pages/News';
import { RequestPage } from '../pages/Request';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/Registration';
import { CatalogPage } from '../pages/Catalog';
import { ProductPage } from '../pages/ProductPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="request" element={<RequestPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
