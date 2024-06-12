import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { useEffect } from 'react';
import { useAppDispatch } from '../../shared/hooks/reduxHooks';
import * as productItem from '../../entities/ProductItem';
import { MySocial } from '../../shared/ui';
import { getCurrencyRate } from '../services/getCurrencyRate';
import { checkAuth } from '../services/checkAuth';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkAuth(dispatch);

    dispatch(productItem.getAll(''));

    getCurrencyRate(dispatch);
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
