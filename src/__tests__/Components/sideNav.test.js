import React from 'react';
import { shallow } from 'enzyme';
import SidNav from '../../App/Components/SideNav';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as checkToken from '../../helper/helper';
import Menu from '../../App/Components/Menu';

Enzyme.configure({
	adapter: new Adapter(),
});
describe('single request', () => {
	it('', done => {
		checkToken.default = jest.fn();
		checkToken.default
			.mockReturnValueOnce({
				fullname: 'lemoisson',
			})
			.mockReturnValueOnce({
				role: 'requester',
			});
		const wrapper = shallow(<SidNav />);
		expect(wrapper.find(Menu)).toExist();
		done();
	});
});