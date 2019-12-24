import React from 'react';
import Accommodations, { mapDispatchToProps } from '../../App/Pages/singleAccomodation';
import Data from '../../__mocks__/data/accommodation.data';
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
	<Accommodations
		match={{
			params: {
				id: 1,
			},
		}}
	/>
);

describe('Verify accommodation page', () => {
	it('Should have a request card request are successfully fetched', async done => {
		Data.mockData.mockSuccess();
		const axiosSpy = sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.successState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.acc-container')).toExist();
		expect(wrapper.find('.mt-5.mb-3.text-primary')).toExist();
		wrapper
			.find('.target-img.pl-2')
			.first()
			.simulate('click');
		expect(axiosSpy.calledOnce);
		await axios.get.getCall(0).returnValue;
		axios.get.restore();
		done();
	});
	it('Should have an error message when accommodation not found', async done => {
		Data.mockData.mockSuccessNull();
		const axiosSpy = sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.successState);
		wrapper = config.mountNewWrapper(store, component);
		wrapper.html();
		expect(wrapper.find('.acc-container')).toExist();
		expect(wrapper.find('.mt-5.mb-3.text-primary')).toExist();
		expect(axiosSpy.calledOnce);
		await axios.get.getCall(0).returnValue;
		axios.get.restore();
		done();
	});
	it('Should have an error message', async done => {
		Data.mockData.mockFailure();
		const axiosSpy = sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.successState);
		wrapper = config.mountNewWrapper(store, component);
		expect(axios.calledOnce);
		await axiosSpy.getCalls();
		try {
			await axiosSpy.getCall(0).returnValue;
		} catch (err) {
			expect(err.response.status).toEqual(404);
		}
		axiosSpy.restore();
		done();
	});
	it('Should have an error message on network failure ', async done => {
		Data.mockData.mockFailureNetwork();
		const axiosSpy = sinon.spy(axios, 'get');
		store = config.mockStore(Data.mockData.successState);
		wrapper = config.mountNewWrapper(store, component);
		expect(axios.calledOnce);
		await axiosSpy.getCalls();
		try {
			await axiosSpy.getCall(0).returnValue;
		} catch (err) {
			expect(err.error).toEqual('failed');
		}

		done();
	});
	it('should map the state to props', () => {
		mapDispatchToProps(jest.fn()).getFeedback({ id: '1' });
		mapDispatchToProps(jest.fn()).singleAccomodation({ id: '1' });
		mapDispatchToProps(jest.fn()).deleteAccommo({ token: 'aaaa', id: '1' });
	});
	afterEach(() => jest.resetAllMocks());
});
