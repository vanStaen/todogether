import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import '../src/lib/i18n';

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(() => {
    console.log("Service worker registered");
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);