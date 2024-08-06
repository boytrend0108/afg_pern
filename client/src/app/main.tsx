import React from 'react';
import ReactDOM from 'react-dom/client';
import './configs/i18n.ts';
import { Provider } from 'react-redux';

import './index.scss';
import { Root } from './Root.tsx';
import { store } from './configs/storeConfig.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
);
