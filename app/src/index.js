import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import register from './sw/register';

register(process.env.PUBLIC_URL + "/service-worker.js");

ReactDOM.render(<App />, document.getElementById('root'));

