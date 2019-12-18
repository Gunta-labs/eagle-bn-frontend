/* eslint-disable no-undef */
import React from 'react';
import Booking, { CreateBooking } from '../../App/Pages/book.accommodation.page';
import Data from '../../__mocks__/data/book.accommodation.data';
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
	<Booking
		match={{
			params: {
				id: 2,
			},
		}}
	/>
);

describe('Verify User page', () => {
	it('should contain a spinner in submit button on pending', done => {
		store = config.mockStore(Data.pendingState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.submit-btn')).toExist();
		expect(wrapper.find('.submit-btn').find('.spinner-grow.spinner-grow-sm')).toExist();
		done();
	});
	it('should have an alert containing success message', done => {
		store = config.mockStore(Data.successState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.alert.alert-success')).toExist();
		expect(wrapper.find('.alert.alert-success')).toIncludeText('uploaded successfully');
		done();
	});
	it('should have an alert containing error message', done => {
		store = config.mockStore(Data.errorState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.alert.alert-danger')).toExist();
		done();
	});
	it('should submit data and get data from actions', async done => {
		sinon.spy(axios, 'post');
		Data.mockSuccess({ name: 'seriously' });
		store = config.mockStore(Data.initialState);
		wrapper = config.mountNewWrapper(store, component);
		const event = { target: { name: 'numberOfSpace', value: '2' } };
		wrapper.find('input[name="numberOfSpace"]').simulate('change', event);
		expect(wrapper.find('input[name="numberOfSpace"]')).toHaveValue('2');
		wrapper.find('form').simulate('submit');

		expect(axios.calledOnce);
		await axios.post.getCall(0).returnValue;
		axios.post.restore();
		done();
	});
	it('should validate dates', async done => {
		Data.mockSuccess({ name: 'seriously' });
		store = config.mockStore(Data.initialState);
		wrapper = config.mountNewWrapper(store, component);
		const event = { target: { name: 'start', value: '2019-12-11' } };
		wrapper.find('input[name="start"]').simulate('change', event);
		wrapper.find('form').simulate('submit');
		expect(wrapper.find(CreateBooking).instance().state.error.data.msg).toEqual(
			'The starting date should be greated than today',
		);
		done();
	});
	it('should validate dates', async done => {
		Data.mockSuccess({ name: 'seriously' });
		store = config.mockStore(Data.initialState);
		wrapper = config.mountNewWrapper(store, component);
		const event = { target: { name: 'start', value: '2030-12-11' } };
		const event1 = { target: { name: 'end', value: '2030-12-10' } };
		wrapper.find('input[name="start"]').simulate('change', event);
		wrapper.find('input[name="end"]').simulate('change', event1);
		wrapper.find('form').simulate('submit');
		expect(wrapper.find(CreateBooking).instance().state.error.data.msg).toEqual(
			'The starting date should not be greater than ending date',
		);
		done();
	});
	it('should submit data and get an error message', async done => {
		sinon.spy(axios, 'post');
		Data.mockFailure({ numberOfSpace: '2' });
		store = config.mockStore(Data.initialState);
		wrapper = config.mountNewWrapper(store, component);
		wrapper.find('form').simulate('submit');

		expect(axios.calledOnce);
		try {
			await axios.post.getCall(0).returnValue;
		} catch (err) {}

		axios.post.restore();
		done();
	});
	it('should submit data and get a network error', async done => {
		sinon.spy(axios, 'post');
		Data.mockNetworkFailure({ name: '3' });
		store = config.mockStore(Data.initialState);
		wrapper = config.mountNewWrapper(store, component);
		wrapper.find('form').simulate('submit');

		expect(axios.calledOnce);
		try {
			await axios.post.getCall(0).returnValue;
		} catch (err) {}

		axios.post.restore();
		done();
	});
});
