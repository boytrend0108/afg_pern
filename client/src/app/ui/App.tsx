import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { useEffect } from 'react';
import localStorageService from '../../shared/services/localStorageService';
import { useAppDispatch } from '../../shared/hooks/reduxHooks';
import { user } from '../../entities/User';
import * as productItem from '../../entities/ProductItem';
import { MySocial } from '../../shared/ui';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorageService.get('accessToken');

    if (token) {
      dispatch(user.checkAuth());
    }

    dispatch(productItem.getAll());
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="App__main">
        <Outlet />
      </main>

      <Footer />

      <div className="App__social">
        <MySocial />
      </div>
    </div>
  );
}

export default App;
