import ReactDOM from 'react-dom';
import App from './App/App.js';
import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
