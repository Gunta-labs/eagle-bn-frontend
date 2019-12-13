import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as checkToken from '../../helper/helper';
import Menu from '../../App/Components/Menu';

Enzyme.configure({
	adapter: new Adapter(),
});
describe('Menu', () => {
	it('should have menu-item id', done => {
		checkToken.default = jest.fn();
		checkToken.default
			.mockReturnValueOnce({
				fullname: 'lemoisson',
			})
			.mockReturnValueOnce({
				role: 'requester',
			});
		const wrapper = shallow(<Menu />);
		expect(wrapper.find('#menu-item')).toExist();
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
		const wrapper = shallow(<Menu active={true} />);
		expect(wrapper.find('.menu-active')).toExist();
		done();
	});
});
