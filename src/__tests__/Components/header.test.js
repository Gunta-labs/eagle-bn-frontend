import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as checkToken from '../../helper/helper';
import Header from '../../App/Components/Header';
import SideNav from '../../App/Components/SideNav';

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
		const wrapper = shallow(<Header showSideNav={true} />);
		expect(wrapper.find(SideNav)).toExist();
		expect(wrapper.find('.navbar-nav.ml-auto')).not.toExist();
		done();
	});
	it('should have menu-active class', done => {
		checkToken.default = jest.fn();
		checkToken.default
			.mockReturnValueOnce({
				fullname: 'lemoisson',
			})
			.mockReturnValueOnce({
				role: 'requester',
			});
		const wrapper = shallow(<Header showSideNav={false} />);
		wrapper
			.find('.navbar-toggler')
			.first()
			.simulate('click');
		expect(wrapper.find(SideNav)).not.toExist();
		expect(wrapper.find('.navbar-nav.ml-auto')).toExist();
		done();
	});
});
