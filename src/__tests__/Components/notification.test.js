import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as checkToken from '../../helper/helper';
import Notification from '../../App/Components/notification.list';
import helper from '../../helper/test.helper';
import data from '../../__mocks__/data/header.data';

Enzyme.configure({
	adapter: new Adapter(),
});
describe('Header', () => {
	it('should have a side-nav-bar', done => {
		checkToken.default = jest.fn();
		checkToken.default
			.mockReturnValueOnce({
				fullname: 'lemoisson',
			})
			.mockReturnValueOnce({
				role: 'requester',
			});
		const store = helper.mockStore(data.mockData.successState);
		const wrapper = helper.mountNewWrapper(store, <Notification />);
		expect(wrapper.find('#singleNot')).toExist();
		wrapper
			.find('#singleNot')
			.first()
			.simulate('click');
		wrapper
			.find('#markAll')
			.first()
			.simulate('click');
		done();
	});
	it('should have a side-nav-bar', done => {
		checkToken.default = jest.fn();
		checkToken.default
			.mockReturnValueOnce({
				fullname: 'lemoisson',
			})
			.mockReturnValueOnce({
				role: 'requester',
			});
		data.mockData.mockFailure();
		const store = helper.mockStore(data.mockData.successState);
		const wrapper = helper.mountNewWrapper(store, <Notification />);
		expect(wrapper.find('#singleNot')).toExist();
		wrapper
			.find('#singleNot')
			.first()
			.simulate('click');
		wrapper
			.find('#markAll')
			.first()
			.simulate('click');
		done();
	});
	it('should have a side-nav-bar', done => {
		checkToken.default = jest.fn();
		checkToken.default
			.mockReturnValueOnce({
				fullname: 'lemoisson',
			})
			.mockReturnValueOnce({
				role: 'requester',
			});
		data.mockData.mockFailureNetwork();
		const store = helper.mockStore(data.mockData.successState);
		const wrapper = helper.mountNewWrapper(store, <Notification />);
		expect(wrapper.find('#singleNot')).toExist();
		wrapper
			.find('#singleNot')
			.first()
			.simulate('click');
		wrapper
			.find('#markAll')
			.first()
			.simulate('click');
		done();
	});
});
