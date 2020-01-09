/* eslint-disable no-undef */
import React from 'react';
import Accommodations, { AccommodationList } from '../../App/Pages/supplier.accommodation.page';
import Data from '../../__mocks__/data/supplier.accommodation.data';
import config from '../../helper/test.helper';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import axios from 'axios';
import Accommodation from '../../App/Components/SupplierAccommodation';
import * as checkToken from '../../helper/helper';

jest.mock('axios');
let store, wrapper;
Enzyme.configure({
	adapter: new Adapter(),
});

const component = <Accommodations />;

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
	it('Should have a accommodation card are successfully fetched', async done => {
		Data.mockData.mockSuccess();
		const axiosSpy = sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.successState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find(Accommodation)).toExist();
		wrapper
			.find('#deleteButton')
			.first()
			.simulate('click');
		expect(axios.calledOnce);
		expect(axiosSpy.calledOnce);
		const axiosPayload = await axios.get.getCall(0).returnValue;
		expect(JSON.stringify(axiosPayload.data[0])).toEqual(JSON.stringify(Data.data));
		axios.get.restore();
		done();
	});
	it('Should have a accommodation card are successfully fetched and user is host', async done => {
		checkToken.default = jest.fn();
		checkToken.default.mockReturnValue({
			fullname: 'host',
			role: 'TAdmin',
		});
		Data.mockData.mockSuccess();
		const axiosSpy = sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.successState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find(Accommodation)).toExist();
		expect(axios.calledOnce);
		expect(axiosSpy.calledOnce);
		const axiosPayload = await axios.get.getCall(0).returnValue;
		expect(JSON.stringify(axiosPayload.data[0])).toEqual(JSON.stringify(Data.data));
		axios.get.restore();
		done();
	});
	it('Should have a accommodation card are successfully fetched and user is host', async done => {
		checkToken.default = jest.fn();
		checkToken.default.mockReturnValue({
			fullname: 'host',
			role: 'host',
		});
		Data.mockData.mockSuccess();
		const axiosSpy = sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.successState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find(Accommodation)).toExist();
		expect(axios.calledOnce);
		expect(axiosSpy.calledOnce);
		const axiosPayload = await axios.get.getCall(0).returnValue;
		expect(JSON.stringify(axiosPayload.data[0])).toEqual(JSON.stringify(Data.data));
		axios.get.restore();
		done();
	});
	it('Should have a error message when error occured', async done => {
		Data.mockData.mockFailure();
		store = config.mockStore(Data.mockData.errorState);
		wrapper = config.mountNewWrapper(store, component);
		done();
	});
	it('Should navigate through the pagination', async done => {
		Data.mockData.mockSuccess();
		sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.successState);
		wrapper = config.mountNewWrapper(store, component);
		wrapper.find('#next-nav').simulate('click');
		expect(wrapper.find(AccommodationList).instance().state.currentPage).toEqual(2);
		wrapper.find('#next-nav').simulate('click');
		const previous = wrapper.find('#previous-nav');
		previous.simulate('click');
		expect(wrapper.find(AccommodationList).instance().state.currentPage).toEqual(1);
		previous.simulate('click');
		const nav_link = wrapper.find('.page-item').last();
		nav_link.simulate('click');
		axios.get.restore();
		done();
	});
});
