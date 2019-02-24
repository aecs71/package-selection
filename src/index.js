import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import App from './components/App';
import '../node_modules/toastr/build/toastr.min.css';
import {BrowserRouter as Router} from 'react-router-dom';


render(
   
    <Router >
    <App/>
    </Router>
 ,document.getElementById('app')
);
