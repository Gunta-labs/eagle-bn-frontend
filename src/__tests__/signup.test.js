import React from 'react';
import { shallow } from '../__mocks__/enzyme/enzymes';
import { Signup, mapStateToProps, mapDispatchToProps } from '../App/Pages/signup.page';

const renderSignup = args => {
	const props = { ...args };
	return shallow(<Signup {...props} />);
};

describe('should test sugnup', () => {
	it('Should submit a signup form', () => {
		const initialProps = {
			props_: {
				signup: {
					user: {},
					signup: false,
					signing: false,
				},
			},
			handleSubmit: jest.fn(),
			handleInput: jest.fn(),
			signup: jest.fn(),
			loading: jest.fn(),
		};
		const wrapper = renderSignup(initialProps);
		const form = wrapper.find('form');
		const event = { preventDefault: jest.fn() };
		const email = { target: { name: 'email', value: 'c@gl.com' } };
		const fullname = { target: { name: 'fullname', value: 'my name' } };
		const password = { target: { name: 'password', value: 'manager' } };
		const confirmPassword = { target: { name: 'confirmPassword', value: 'manager' } };
		form.find('input[name="email"]').simulate('change', email);
		form.find('input[name="password"]').simulate('change', password);
		form.find('input[name="fullname"]').simulate('change', fullname);
		form.find('input[name="confirmPassword"]').simulate('change', confirmPassword);
		form.simulate('submit', event);
		expect(initialProps.signup).toBeCalledWith({
			email: 'c@gl.com',
			password: 'manager',
			fullname: 'my name',
			confirmPassword: 'manager',
		});
	});

	it('should map state to props and dispach to props', () => {
		const initialState = {
			user: {},
			signup: false,
			signing: false,
		};
		expect(mapStateToProps(initialState).props_.signup).toBeDefined();
		expect(mapDispatchToProps(jest.fn()).signup).toBeDefined();
	});
});
