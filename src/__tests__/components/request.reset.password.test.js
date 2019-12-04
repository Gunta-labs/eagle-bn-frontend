import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import axios from 'axios';
import RequestResetPasswordComponent from '../../App/Pages/request.reset.password.page';
import Data from '../../__mocks__/data/reset.password.data';
import config from '../../helper/test.helper';

jest.mock('axios');
Enzyme.configure({
	adapter: new Adapter(),
});

const component = <RequestResetPasswordComponent />;
const store = config.mockStore(Data.not_started);
const wrapper = config.mountNewWrapper(store, component);
const form = wrapper.find('form');
const event = { preventDefault: jest.fn() };
const email = { target: { name: 'email', value: 'requester@gmail.com' } };

describe('Request Reset Password Page [Testing Components]', () => {
	it('should show succeed on 201 success', done => {
		Data.rrpMockSuccess();
		sinon.spy(axios, 'post');
		form.find('input[name="email"]').simulate('change', email);
		form.simulate('submit', event);
		expect(axios.calledOnce);
		axios.post.restore();
		done();
	});
	it('should show fail message on 409 failed', done => {
		Data.rrpMockFailure();
		sinon.spy(axios, 'post');
		form.find('input[name="email"]').simulate('change', email);
		form.simulate('submit', event);
		expect(axios.post.calledOnce);
		axios.post.restore();
		done();
	});
	it('should show fail message on 500 failed', done => {
		Data.rrpMockFailure2();
		sinon.spy(axios, 'post');
		form.find('input[name="email"]').simulate('change', email);
		form.simulate('submit', event);
		expect(axios.post.calledOnce);
		axios.post.restore();
		done();
	});
});
