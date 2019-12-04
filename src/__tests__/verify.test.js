/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Verify from '../App/Pages/verifyUser.page';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import '@babel/polyfill';
import axios from 'axios';
import contants from '../Redux/constants';

const middleware = [thunk];
const mockStore = configureStore(middleware);

Enzyme.configure({
	adapter: new Adapter(),
});
jest.mock('axios');

let store, wrapper;
const successState = {
	Verify: {
		pending: false,
		verifyResult: {
			msg: 'verified',
		},
		error: null,
	},
};
const initialState = {
	Verify: {
		pending: false,
		verifyResult: null,
		error: null,
	},
};
const pendingState = {
	Verify: {
		pending: true,
		verifyResult: null,
		error: null,
	},
};
const errorState = {
	Verify: {
		pending: false,
		verifyResult: null,
		error: {
			error: 'error',
		},
	},
};
const mockSuccess = () => {
	const data = {
		msg: 'msg',
		status: 200,
	};
	axios.get.mockResolvedValue({
		data,
	});
};
const mockFailure = () => {
	const data = {
		response: {
			msg: 'msg',
			status: 401,
		},
	};
	axios.get.mockImplementationOnce(() => Promise.reject(data));
};
const mountNewWrapper = store => {
	return mount(
		<Provider store={store}>
			<Verify
				match={{
					params: {
						token: '939399339393',
					},
				}}
			/>{' '}
		</Provider>,
	);
};

describe('Verify User page', () => {
	it('Should have a spinner when pending', done => {
		mockSuccess();
		store = mockStore(pendingState);
		wrapper = mountNewWrapper(store);
		expect(wrapper.find('h2')).toExist();
		expect(wrapper.find('h2')).toIncludeText('Account verification ...');
		expect(wrapper.find('.spinner-border')).toExist();
		done();
	});
	it('Should have a button to go to login', done => {
		mockSuccess();
		store = mockStore(successState);
		wrapper = mountNewWrapper(store);
		expect(wrapper.find('h2')).toExist();
		expect(wrapper.find('h2')).toIncludeText('Account verified!');
		expect(wrapper.find('.btn-primary')).toIncludeText('Go to login');
		done();
	});
	it('Should have an error message ', done => {
		mockFailure();
		store = mockStore(errorState);
		wrapper = mountNewWrapper(store);
		expect(wrapper.find('h2')).toExist();
		expect(wrapper.find('h2')).toIncludeText('Account verification failed');
		done();
	});
});

describe('test verifyUser actions', () => {
	it('should have the pending action', () => {
		store = mockStore(initialState);
		store.dispatch({
			type: contants.VERIFY_PENDING,
			pending: true,
		});
		const actions = store.getActions();
		expect(actions[0].type).toEqual('VERIFY_PENDING');
	});
	it('should have the success action', () => {
		store = mockStore(successState);
		store.dispatch({
			type: contants.VERIFY_SUCCESS,
			verifyResult: {
				msg: 'verified',
			},
		});
		const actions = store.getActions();
		expect(actions[0].type).toEqual('VERIFY_SUCCESS');
		expect(actions[0].verifyResult.msg).toEqual('verified');
	});
	it('should have the error action', () => {
		mockFailure();
		store = mockStore(errorState);
		store.dispatch({
			type: contants.VERIFY_ERROR,
			error: {
				msg: 'error',
			},
		});
		const actions = store.getActions();
		expect(actions[0].type).toEqual('VERIFY_ERROR');
	});
});
