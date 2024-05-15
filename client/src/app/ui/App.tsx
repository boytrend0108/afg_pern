import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer/Footer';

function App() {
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
