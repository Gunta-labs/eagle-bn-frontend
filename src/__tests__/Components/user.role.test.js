import React from 'react';
import UserRole, { mapDispatchToProps } from '../../App/Pages/user.role';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const renderUserRole = args => {
	const props = { ...args };
	const MyUserRole = UserRole.WrappedComponent;
	return shallow(<MyUserRole {...props} />);
};

describe('should test user role component', () => {
	it('Should render', () => {
		const initialProps = {
			pending: false,
			payload: null,
			error: null,
			state: {
				email: '',
				Role: '',
				data: '',
				error: '',
			},
			userRole: {
				modelStatus: 'started',
				changeRoleStatus: 'not_started',
			},

			changeRole: jest.fn(),
			closeModel: jest.fn(),
			changeModelStatus: jest.fn(),
			manageChangeRole: jest.fn(),
			getUsers: jest.fn(() => {
				return {
					payload: {
						data: [
							{
								id: 4,
								fullname: 'dummy',
								email: 'dummy@gmail.com',
								avatar: '',
								Role: {
									id: 5,
									roleName: 'requester',
									roleValue: 'requester',
									avatar: '',
								},
							},
							{
								id: 7,
								fullname: 'hgcvjfg',
								avatar: '',
								email: '',
								Role: {
									id: 5,
									roleName: 'requester',
									roleValue: 'requester',
								},
							},
						],
					},
				};
			}),
		};

		const wrapper = renderUserRole(initialProps);
		expect(wrapper).toHaveLength(1);
	});
	it('simulate update action role', () => {
		const initialProps = {
			preventDefault: jest.fn(),
			state: {
				email: '',
				Role: '',
				data: '',
				error: '',
			},
			userRole: {
				modelStatus: 'started',
				changeRoleStatus: 'not_started',
			},

			changeRole: jest.fn(),
			closeModel: jest.fn(),
			changeModelStatus: jest.fn(),
			manageChangeRole: jest.fn(),
			showModel: jest.fn(),
		};
		const event = { preventDefault: jest.fn() };
		const data = {
			closeModel: { modelStatus: 'started' },
			changeRoleStatus: 'not_started',
			email: 'as',
			Role: {
				roleName: 'host',
				roleValue: 'host',
			},
		};
		const wrapper = renderUserRole(initialProps);
		initialProps.state.eamil = data.email;
		const update = wrapper.find('#changeRo');
		update.simulate('click', event);
		// eslint-disable-next-line no-unused-vars
		const { changeRole } = wrapper.instance().props;
	});
	it('should map the state to props', () => {
		mapDispatchToProps(jest.fn()).getUsers({ token: 'ddskxfbjhk' });
		mapDispatchToProps(jest.fn()).manageChangeRole({ type: 'change_role_status', payload: '' });
		mapDispatchToProps(jest.fn()).changeModelStatus('started');
	});
});
