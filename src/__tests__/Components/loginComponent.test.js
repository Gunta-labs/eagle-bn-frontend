import React from 'react';
import { Login, mapDispatchToProps } from '../../App/Pages/login.page';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const renderLogin = args => {
	const props = { ...args };
	return shallow(<Login {...props} />);
};
describe('should find two inputs', () => {
	it('Should render', () => {
		const initialProps = {
			user: {
				isLoggedIn: true,
				message: {},
				error: '',
			},
			authentication: jest.fn(),
			handleSubmit: jest.fn(),
			handleInput: jest.fn(),
			socialLog: jest.fn(),
		};

		const wrapper = renderLogin(initialProps);
		expect(wrapper).toHaveLength(1);
	});

	it('Should successfully submit a login form', () => {
		const initialProps = {
			user: {
				isLoggedIn: false,
				message: {},
				error: '',
			},
			authentication: jest.fn(),
			handleSubmit: jest.fn(),
			handleInput: jest.fn(),
			authPending: jest.fn(),
		};
		const wrapper = renderLogin(initialProps);
		const form = wrapper.find('form');
		const event = { preventDefault: jest.fn() };
		const email = { target: { name: 'email', value: 'c@gl.com' } };
		const password = { target: { name: 'password', value: 'manager' } };
		form.find('input[name="email"]').simulate('change', email);
		form.find('input[name="password"]').simulate('change', password);
		form.simulate('submit', event);
		const { authentication } = wrapper.instance().props;
		expect(authentication).toBeCalledWith({ email: 'c@gl.com', password: 'manager' });
	});
	it('should map the state to props', () => {
		mapDispatchToProps(jest.fn()).authentication({ email: 'dhjv', password: 'dskxfbjhk' });
		mapDispatchToProps(jest.fn()).socialLog();
		mapDispatchToProps(jest.fn()).authPending();
	});
	it('Should render the page with error message', () => {
		const initialProps = {
			user: {
				isLoggedIn: false,
				message: {},
				error: 'this is an error',
			},
			authentication: jest.fn(),
			handleSubmit: jest.fn(),
			handleInput: jest.fn(),
		};

		const wrapper = renderLogin(initialProps);
		expect(wrapper).toHaveLength(1);
	});
});
