import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResetPasswordComponent from '../../App/Pages/reset.password.page';
import Data from '../../__mocks__/data/reset.password.data';
import config from '../../helper/test.helper';

Enzyme.configure({
	adapter: new Adapter(),
});

const component = (
	<ResetPasswordComponent
		match={{
			params: {
				token: 'ewfwefwe435rfcewf',
			},
		}}
	/>
);
let store, wrapper;

describe('Reset Password Page', () => {
	it('dispatch not started', done => {
		store = config.mockStore(Data.not_started);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.mainContainer')).toExist();
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
		expect(wrapper.find('.alert').first()).toIncludeText('your password was updated successfully');
		done();
	});
	it('dispatch failed', done => {
		store = config.mockStore(Data.failed);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.alert').first()).toIncludeText(
			'Please check your link or check if your password contains letters, numbers, 8 minimum characters, and at least 1 special character',
		);
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
	it('dispatch error', done => {
		store = config.mockStore(Data.not_match);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.alert').first()).toIncludeText('passwords provided must be the same');
		done();
	});
});
