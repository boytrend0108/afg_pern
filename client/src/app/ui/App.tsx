import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer/Footer';
import { useEffect } from 'react';
import localStorageService from '../../shared/services/localStorageService';
import { useAppDispatch } from '../../shared/hooks/reduxHooks';
import { user } from '../../entities/User';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userFromStorage = localStorageService.get('user');

    if (userFromStorage) {
      dispatch(user.actions.setUser(userFromStorage));
    }
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="App__main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
