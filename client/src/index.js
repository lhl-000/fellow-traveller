import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import App from './App';
import BasicLayout from './layouts/index'
import reportWebVitals from './reportWebVitals';
import {LocaleProvider}from 'antd-mobile';
import { Provider } from 'react-redux'
import store from './redux/store';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

import './asserts/umi.css';
import 'antd-mobile/dist/antd-mobile.css';

import './global.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <LocaleProvider locale={enUS}>
    <App />
    </LocaleProvider>
    <BasicLayout/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
