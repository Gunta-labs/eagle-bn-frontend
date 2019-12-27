/* eslint-disable no-undef */
import React from 'react';
import Accommodation from '../../App/Pages/update.accomodation';
import Data from '../../__mocks__/data/update.accommodation.data';
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

const component = <Accommodation match={{ params: { id: 1 } }} />;

describe('Verify User page', () => {
	it('should contain a spinner in submit button on pending', done => {
		store = config.mockStore(Data.pendingState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.btn.btn-primary.btn-block.my-3.mt-4')).toExist();
		expect(wrapper.find('.btn.btn-primary.btn-block.my-3.mt-4')).toIncludeText('updating . . . .');
		done();
	});
	it('should have an alert containing success message', done => {
		store = config.mockStore(Data.successState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.alert.alert-success')).toExist();
		expect(wrapper.find('.alert.alert-success')).toIncludeText('Update successfully');
		done();
	});
	it('should submit data and get an error message', async done => {
		sinon.spy(axios, 'patch');
		Data.mockFailure({ name: 'seriously' });
		store = config.mockStore(Data.initialState);
		wrapper = config.mountNewWrapper(store, component);
		wrapper.find('form').simulate('submit');

		expect(axios.calledOnce);
		try {
			await axios.post.getCall(0).returnValue;
		} catch (err) {}

		axios.patch.restore();
		done();
	});
	it('should submit data and get a network error', async done => {
		sinon.spy(axios, 'patch');
		Data.mockNetworkFailure({ name: 'seriously' });
		store = config.mockStore(Data.initialState);
		wrapper = config.mountNewWrapper(store, component);
		wrapper.find('form').simulate('submit');

		expect(axios.calledOnce);
		try {
			await axios.post.getCall(0).returnValue;
		} catch (err) {}

		axios.patch.restore();
		done();
	});
});
