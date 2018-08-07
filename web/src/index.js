import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import axios from './http.js';

import './assets/css/App.less';
import App from './router/index';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
