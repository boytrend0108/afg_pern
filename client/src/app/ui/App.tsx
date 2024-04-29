import { Link, Outlet } from 'react-router-dom';

import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <div className="App__container">
          <div className="App__header-content">
            <Link to="/" className="App__header-logo">
              <img src="/logo.png" alt="logo" />
            </Link>
            <div className="App__header-nav"></div>
            <div className="App__header-buttons"></div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
