import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RequestResetPasswordComponent from '../../App/Pages/request.reset.password.page';
import Data from '../../__mocks__/data/reset.password.data';
import config from '../../helper/test.helper';
import constants from '../../Redux/constants';

jest.mock('axios');
Enzyme.configure({
	adapter: new Adapter(),
});

const component = <RequestResetPasswordComponent />;

let store, wrapper;

describe('Request Reset Password Page', () => {
	it('dispatch not started', done => {
		store = config.mockStore(Data.not_started);
		store.dispatch({ type: constants.REQUEST_RESET_SUCCESS });
		// expect(wrapper.find('.mainContainer')).toExist();
		done();
	});
	it('dispatch pending', done => {
		store = config.mockStore(Data.pending);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.spinner-border')).toExist();
		done();
	});
	it('dispatch success', done => {
		store = config.mockStore(Data.success);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.alert').first()).toIncludeText('password reset instructions sent to ');
		done();
	});
	it('dispatch failed', done => {
		store = config.mockStore(Data.failed);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.alert').first()).toIncludeText('The email is invalid or not registered');
		done();
	});
	it('dispatch error', done => {
		store = config.mockStore(Data.error);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.alert').first()).toIncludeText(
			'Something went wrong! please try again later.',
		);
		done();
	});
});
