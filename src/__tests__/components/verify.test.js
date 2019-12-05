/* eslint-disable no-undef */
import React from 'react';
import Verify from '../../App/Pages/VerifyUser.page';
import Data from '../../__mocks__/data/verify.data';
import config from '../../helper/test.helper';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import axios from 'axios';

jest.mock('axios');
let store, wrapper;
Enzyme.configure({
	adapter: new Adapter(),
});

const component = (
	<Verify
		match={{
			params: {
				token: '939399339393',
			},
		}}
	/>
);

describe('Verify User page', () => {
	it('Should have an empty title when initial state', done => {
		Data.mockSuccess();
		store = config.mockStore(Data.initialState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('h2')).toExist();
		expect(wrapper.find('h2')).toIncludeText('');
		done();
	});
	it('Should have a spinner when pending', done => {
		Data.mockSuccess();
		store = config.mockStore(Data.pendingState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('h2')).toExist();
		expect(wrapper.find('h2')).toIncludeText('Account verification ...');
		expect(wrapper.find('.spinner-border')).toExist();
		done();
	});
	it('Should have a button to go to login', async done => {
		Data.mockSuccess({ verified: true });
		sinon.spy(axios, 'get');
		store = config.mockStore(Data.successState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('h2')).toExist();
		expect(wrapper.find('h2')).toIncludeText('Account verified!');
		expect(wrapper.find('.btn-primary').first()).toIncludeText('Go to login');
		expect(axios.calledOnce);
		const axiosPayload = await axios.get.getCall(0).returnValue;
		expect(axiosPayload.data.payload.verified).toEqual(true);
		axios.get.restore();
		done();
	});
	it('Should have an error message ', async done => {
		Data.mockFailure({ error: 'wrong token' });
		sinon.spy(axios, 'get');
		store = config.mockStore(Data.errorState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('h2.error')).toExist();
		expect(wrapper.find('h2.error')).toIncludeText('Account verification failed');
		expect(axios.calledOnce);
		try {
			await axios.get.getCall(0).returnValue;
		} catch (err) {
			expect(err.response.payload.error).toEqual('wrong token');
		}

		done();
	});
});
