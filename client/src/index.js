import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import App from './App';
import BasicLayout from './layouts/index'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <BasicLayout/>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
