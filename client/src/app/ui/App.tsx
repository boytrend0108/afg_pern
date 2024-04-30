import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from '../../widgets/Header';

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
