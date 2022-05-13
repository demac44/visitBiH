import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./index.css"

import Admin from './Routes/Admin/Admin';

function getCookie(name) {
  let a = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`);
  return a ? a[1] : '';
}

export const LangContext = createContext(getCookie("lang"))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LangContext.Provider value={getCookie("lang")}>
      <BrowserRouter>
        <App />
        <Admin/>
      </BrowserRouter>
    </LangContext.Provider>
  </React.StrictMode>
);

reportWebVitals();
