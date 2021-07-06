import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import App from './App';
import BasicLayout from './layouts/index'
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import store from './redux/store';

//import './mock/index';
import './asserts/umi.css';
import './global.css';
import 'antd-mobile/dist/antd-mobile.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <App />
    <BasicLayout/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
