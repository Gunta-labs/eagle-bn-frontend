import React from 'react';
import LikeAccommodation from '../../App/Components/like.accommodation';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import jwt from 'jsonwebtoken';

jest.mock('axios');
configure({ adapter: new Adapter() });
const props = {
	getLikes: jest.fn(),
	like: jest.fn(),
	id: 1,
};

const renderDashboard = args => {
	const props = { ...args };
	return shallow(<LikeAccommodation {...props} />);
};

describe('render like accommodation, and test all cases', () => {
	afterEach(() => jest.resetAllMocks());
	it('test get likes, when user liked accommodation', done => {
		jest.spyOn(jwt, 'decode').mockReturnValue({ userId: 1 });
		axios.get.mockResolvedValue({
			data: {
				data: [
					{
						userId: 1,
					},
				],
			},
			status: 200,
		});
		axios.post.mockResolvedValue({ status: 201 });
		const event = { preventDefault: jest.fn(), target: {} };
		const wrapper = renderDashboard(props);
		wrapper.find('#like').simulate('click', event);
		done();
	});
	it('test get likes, when user has not liked accommodation', done => {
		jest.spyOn(jwt, 'decode').mockReturnValue({ userId: 0 });
		axios.get.mockResolvedValue({ data: { data: [] }, status: 200 });
		axios.post.mockResolvedValue({ status: 201 });
		const event = { preventDefault: jest.fn(), target: {} };
		const wrapper = renderDashboard(props);
		wrapper.find('#like').simulate('click', event);
		done();
	});
	it('toast something went wrong, connection error', done => {
		axios.post.mockImplementation(() => Promise.reject({ status: 401 }));
		const event = { preventDefault: jest.fn(), target: {} };
		const wrapper = renderDashboard(props);
		wrapper.find('#like').simulate('click', event);
		done();
	});
	it('toast not authorized', done => {
		axios.post.mockImplementation(() => Promise.reject({ response: { status: 401 } }));
		const event = { preventDefault: jest.fn(), target: {} };
		const wrapper = renderDashboard(props);
		wrapper.find('#like').simulate('click', event);
		done();
	});
	it('toast accommodation not found', done => {
		axios.get.mockImplementation(() => Promise.reject({ response: { status: 400 } }));
		axios.post.mockImplementation(() => Promise.reject({ response: { status: 400 } }));
		const event = { preventDefault: jest.fn(), target: {} };
		const wrapper = renderDashboard(props);
		wrapper.find('#like').simulate('click', event);
		done();
	});
});
