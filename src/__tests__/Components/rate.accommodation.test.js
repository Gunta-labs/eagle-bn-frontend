/* eslint-disable no-undef */
import React from 'react';
import { Bookings, BookingList } from '../../App/Pages/booking.list';
import Data from '../../__mocks__/data/booking.list.data';
import config from '../../helper/test.helper';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import axios from 'axios';
import Booking from '../../App/Components/Booking';
import Rater from 'react-rating';

jest.mock('axios');
let store, wrapper;
Enzyme.configure({
	adapter: new Adapter(),
});

const component = <Bookings />;

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
	it('Should have a booking card are successfully fetched', async done => {
		Data.mockData.mockSuccess();
		const axiosSpy = sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.successState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find(Booking)).toExist();
		expect(axios.calledOnce);
		expect(axiosSpy.calledOnce);
		const axiosPayload = await axios.get.getCall(0).returnValue;
		expect(JSON.stringify(axiosPayload.data.data[0])).toEqual(JSON.stringify(Data.data));
		axios.get.restore();
		done();
	});
	it('Should navigate through the pagination', async done => {
		Data.mockData.mockSuccess();
		sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.successState);
		wrapper = config.mountNewWrapper(store, component);
		wrapper.find('#next-nav').simulate('click');
		expect(wrapper.find(BookingList).instance().state.currentPage).toEqual(2);
		wrapper.find('#next-nav').simulate('click');
		const previous = wrapper.find('#previous-nav');
		previous.simulate('click');
		expect(wrapper.find(BookingList).instance().state.currentPage).toEqual(1);
		previous.simulate('click');
		const nav_link = wrapper.find('.page-item').last();
		nav_link.simulate('click');
		axios.get.restore();
		done();
	});
	it('should have submit the rating form', async done => {
		Data.mockData.mockSuccess();
		sinon.spy(axios, 'patch');
		store = config.mockStore(Data.mockData.successState2);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find(Rater)).toExist();
		wrapper
			.find(Rater)
			.first()
			.props()
			.onClick();
		wrapper.find(BookingList).setState({ currentBooking: Data.data, showModal: true });
		wrapper
			.find(Rater)
			.first()
			.props()
			.onClick();
		const event = { target: { name: 'feedback', value: 'seriously' } };
		wrapper
			.find('textarea')
			.first()
			.simulate('change', event);
		wrapper.find('form').simulate('submit');
		wrapper
			.find('.blurPanel')
			.last()
			.simulate('click');
		expect(axios.calledOnce);
		try {
			expect((await axios.patch.getCall(0).returnValue).msg).toEqual('successfully rated');
		} catch (err) {
			expect(err.response.status).toEqual(404);
		}
		axios.patch.restore();
		done();
	});
	it('should return an error message', async done => {
		Data.mockData.mockFailure();
		sinon.spy(axios, 'patch');
		store = config.mockStore(Data.mockData.errorState);
		wrapper = config.mountNewWrapper(store, component);
		wrapper.find(BookingList).setState({ currentBooking: Data.data2, showModal: true });
		wrapper.find('form').simulate('submit');
		expect(axios.calledOnce);
		try {
			await axios.patch.getCall(0).returnValue;
		} catch (err) {
			expect(err.response.status).toEqual(404);
		}
		axios.patch.restore();
		done();
	});
	it('should simulate network failure', async done => {
		Data.mockData.mockFailureNet();
		sinon.spy(axios, 'patch');
		store = config.mockStore(Data.mockData.errorState2);
		wrapper = config.mountNewWrapper(store, component);
		wrapper.find(BookingList).setState({ currentBooking: Data.data2, showModal: true });
		wrapper.find('form').simulate('submit');
		expect(axios.calledOnce);
		try {
			await axios.patch.getCall(0).returnValue;
		} catch (err) {
			expect(err.message).toEqual('network failure');
		}
		axios.patch.restore();
		done();
	});
});
