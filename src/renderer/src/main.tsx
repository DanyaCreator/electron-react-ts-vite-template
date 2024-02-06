import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import { ThemeProvider } from 'styled-components';

// styled-components theme
const theme = {};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <div />
    </ThemeProvider>
  </React.StrictMode>,
);

// for deleting preload screen
postMessage({ payload: 'removeLoading' }, '*');
