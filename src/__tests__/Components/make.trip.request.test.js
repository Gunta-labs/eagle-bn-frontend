import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import config from '../../helper/test.helper';
import TripRequestComponent from '../../App/Pages/trip.request.page';
import Data from '../../__mocks__/data/trip.request';

jest.mock('axios');
Enzyme.configure({
	adapter: new Adapter(),
});

const component = <TripRequestComponent />;

describe('Make Trip Request Page [testing component]', () => {
	it('success with 201 response', done => {
		Data.mockSuccess(201);
		sinon.spy(axios, 'post');
		const store = config.mockStore(Data.success);
		const wrapper = config.mountNewWrapper(store, component);
		const form = wrapper.find('form');
		const event = { preventDefault: jest.fn() };
		const value = { target: { id: 'just-id', value: 'just a value' } };
		form.find('input[id="city"]').simulate('change', value);
		form.simulate('submit', event);
		expect(axios.calledOnce);
		axios.post.restore();
		done();
	});
	it('should fail with 400 response', done => {
		Data.mockFailure(400);
		sinon.spy(axios, 'post');
		const store = config.mockStore(Data.not_started);
		const wrapper = config.mountNewWrapper(store, component);
		const form = wrapper.find('form');
		const event = { preventDefault: jest.fn() };
		const value = { target: { id: 'just-id', value: 'just a value' } };
		form.find('button').simulate('click', value);
		form.simulate('submit', event);
		expect(axios.calledOnce);
		axios.post.restore();
		done();
	});
	it('should fail with 401 response', done => {
		Data.mockFailure(401, true);
		sinon.spy(axios, 'post');
		const store = config.mockStore(Data.not_started);
		const wrapper = config.mountNewWrapper(store, component);
		const form = wrapper.find('form');
		const event = { preventDefault: jest.fn() };
		form.simulate('submit', event);
		expect(axios.calledOnce);
		axios.post.restore();
		done();
	});
	it('should fail with 500 response', done => {
		Data.mockFailure(500, true);
		sinon.spy(axios, 'post');
		jest.spyOn(jwt, 'decode').mockReturnValue({ role: 'requester', fullname: 'requester' });
		const store = config.mockStore(Data.not_started);
		const wrapper = config.mountNewWrapper(store, component);
		const form = wrapper.find('form');
		const event = { preventDefault: jest.fn() };
		form.simulate('submit', event);
		expect(axios.calledOnce);
		axios.post.restore();
		jest.resetAllMocks();
		done();
	});
});
