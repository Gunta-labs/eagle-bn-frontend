/* eslint-disable no-undef */
import React from 'react';
import Requests from '../../App/Pages/RequestList.page';
import Data from '../../__mocks__/data/request.list.data';
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

const component = <Requests />;

describe('Verify User page', () => {
	it('Should have an empty title when initial state', done => {
		Data.mockData.mockSuccess();
		store = config.mockStore(Data.mockData.initialState);
		wrapper = config.mountNewWrapper(store, component);
		done();
	});
	it('Should have a spinner when pending', done => {
		Data.mockData.mockSuccess();
		store = config.mockStore(Data.mockData.pendingState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.spinner-border')).toExist();
		done();
	});
	it('Should have a request card request are successfully fetched', async done => {
		Data.mockData.mockSuccess();
		const axiosSpy = sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.successState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.card.mt-1.ml-lg-1.ml-md-1.mr-lg-1.mr-md-1.ml-4')).toExist();
		expect(axios.calledOnce);
		expect(axiosSpy.calledOnce);
		const axiosPayload = await axios.get.getCall(0).returnValue;
		expect(JSON.stringify(axiosPayload.data[0])).toEqual(JSON.stringify(Data.data));
		axios.get.restore();
		done();
	});
	it('Should have an error message ', async done => {
		Data.mockData.mockFailure();
		sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.errorState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('h3.error')).toExist();
		expect(wrapper.find('h3.error')).toIncludeText('No request found');
		expect(axios.calledOnce);
		try {
			await axios.get.getCall(0).returnValue;
		} catch (err) {
			expect(err.response.status).toEqual(404);
		}

		done();
	});
});
