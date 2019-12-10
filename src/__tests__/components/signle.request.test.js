import React from 'react';
import { shallow } from 'enzyme';
import Request from '../../App/Components/Request';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Data from '../../__mocks__/data/request.list.data';

Enzyme.configure({
	adapter: new Adapter(),
});
describe('single request', () => {
	it('should display a card containing the request data', done => {
		const wrapper = shallow(<Request request={Data.data} />);
		expect(wrapper.find('#origin').first()).toIncludeText(
			`${Data.data.city}, ${Data.data.country}`,
		);
		done();
	});
	it('should have status pending', done => {
		const wrapper = shallow(<Request request={Data.data} />);
		expect(wrapper.find('#status').first()).toIncludeText('rejected');
		expect(wrapper.find('.btn-danger')).toExist();
		done();
	});
	it('should have status pending', done => {
		const newdata = Data.data;
		newdata.status = 'pending';
		const wrapper = shallow(<Request request={newdata} />);
		expect(wrapper.find('#status').first()).toIncludeText('pending');
		expect(wrapper.find('.btn-warning')).toExist();
		done();
	});
	it('should have status rejected', done => {
		const newdata = Data.data;
		newdata.status = 'rejected';
		const wrapper = shallow(<Request request={newdata} />);
		expect(wrapper.find('#status').first()).toIncludeText('rejected');
		expect(wrapper.find('.btn-danger')).toExist();
		done();
	});
	it('should have status approved', done => {
		const newdata = Data.data;
		newdata.status = 'approved';
		const wrapper = shallow(<Request request={newdata} />);
		expect(wrapper.find('#status').first()).toIncludeText('approved');
		expect(wrapper.find('.btn-success')).toExist();
		done();
	});
	it('should handle a request with no trip inside', done => {
		const newdata = Data.data;
		newdata.Trips = [];
		const wrapper = shallow(<Request request={newdata} />);
		expect(wrapper.find('#destination').first()).toIncludeText('none, none');
		done();
	});
});
