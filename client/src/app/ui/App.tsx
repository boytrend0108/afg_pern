import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from '../../shared/hooks/reduxHooks';
import { MySocial } from '../../shared/ui';
import { getCurrencyRate } from '../services/getCurrencyRate';
import { checkAuth } from '../services/checkAuth';
import { MyLoader } from '../../shared/ui/MyLoader/MyLoader';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkAuth(dispatch);
    getCurrencyRate(dispatch);
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="App__main">
        <Suspense
          fallback={
            <div style={{ margin: 'auto' }}>
              <MyLoader />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <Footer />

      <div className="App__social">
        <MySocial />
      </div>
    </div>
  );
}

export default App;
