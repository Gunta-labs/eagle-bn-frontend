import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import axios from 'axios';
import ResetPasswordComponent from '../../App/Pages/reset.password.page';
import Data from '../../__mocks__/data/reset.password.data';
import config from '../../helper/test.helper';

jest.mock('axios');
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
let store = config.mockStore(Data.not_started);
let wrapper = config.mountNewWrapper(store, component);
const form = wrapper.find('form');
const event = { preventDefault: jest.fn() };
const password = { target: { name: 'password', value: '121212b!' } };
const confirmPassword = { target: { name: 'confirmPassword', value: '121212b!' } };

describe('Request Reset Password Page [Testing Components]', () => {
	it('should succeed with 201 success', done => {
		Data.rpMockSuccess();
		sinon.spy(axios, 'patch');
		form.find('input[name="password"]').simulate('change', password);
		form.find('input[name="confirmPassword"]').simulate('change', confirmPassword);
		form.simulate('submit', event);
		expect(axios.calledOnce);
		axios.patch.restore();
		done();
	});
	it('should fail with 400 success', done => {
		Data.rpMockFailure();
		sinon.spy(axios, 'patch');
		form.find('input[name="password"]').simulate('change', password);
		form.find('input[name="confirmPassword"]').simulate('change', confirmPassword);
		form.simulate('submit', event);
		expect(axios.calledOnce);
		axios.patch.restore();
		done();
	});
	it('should fail with 500', done => {
		Data.rpMockFailure2();
		sinon.spy(axios, 'patch');
		form.find('input[name="password"]').simulate('change', password);
		form.find('input[name="confirmPassword"]').simulate('change', confirmPassword);
		form.simulate('submit', event);
		expect(axios.calledOnce);
		axios.patch.restore();
		done();
	});
	it('should fail when password is not matching', done => {
		form.find('input[name="password"]').simulate('change', password);
		form
			.find('input[name="confirmPassword"]')
			.simulate('change', { target: { name: 'confirmPassword', value: '121212b' } });
		form.simulate('submit', event);
		done();
	});
});
