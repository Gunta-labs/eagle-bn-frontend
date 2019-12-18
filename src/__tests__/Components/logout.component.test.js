import React from 'react';
import { Logout, mapDispatchToProps } from '../../App/Components/logout.component';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const renderLogout = args => {
	const props = { ...args };
	return shallow(<Logout {...props} />);
};

describe('should call logout component', () => {
	it('Should render', () => {
		const initialProps = {
			payload: {
				status: 200,
			},
			pending: '',
			token: localStorage.getItem('barefoot_token'),
			inits: jest.fn(),
			logout: jest.fn(),
		};

		const wrapper = renderLogout(initialProps);
		expect(wrapper).toHaveLength(1);
	});

	it('Should successfully click a logout button', () => {
		const initialProps = {
			payload: {
				status: 200,
			},
			pending: '',
			token: localStorage.getItem('barefoot_token'),
			inits: jest.fn(),
			logout: jest.fn(),
		};
		const wrapper = renderLogout(initialProps);
		const click = wrapper.find('button');
		const event = { preventDefault: jest.fn() };
		click.simulate('click', event);
		const { logout } = wrapper.instance().props;
		expect(logout).toHaveBeenCalled();
	});
	it('should map the state to props', () => {
		mapDispatchToProps(jest.fn()).logout('eyjhsbjhcdhahsvdvv');
		mapDispatchToProps(jest.fn()).inits();
	});
});
