import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const mountNewWrapper = (store, Component, props) => {
	return mount(
		<Provider store={store}>
			<Router>{Component}</Router>
		</Provider>,
	);
};

export default { mockStore, mountNewWrapper };
