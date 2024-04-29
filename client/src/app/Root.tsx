import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './ui/App.tsx';
import { HomePage } from '../pages/Home/index.ts';
import { CategoryPage } from '../pages/Category/index.ts';
import { ContactPage } from '../pages/Contact/index.ts';
import { NewsPage } from '../pages/News/index.ts';
import { RequestPage } from '../pages/Request/index.ts';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="request" element={<RequestPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
