import React from 'react';
import { UserProfile, mapDispatchToProps } from '../../App/Pages/dashboard';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jwt from 'jsonwebtoken';

configure({ adapter: new Adapter() });

const renderDashboard = args => {
	const props = { ...args };
	return shallow(<UserProfile {...props} />);
};

describe('should test dashboard component', () => {
	afterEach(() => jest.resetAllMocks());
	it('Should render', () => {
		jest.spyOn(jwt, 'decode').mockReturnValue({ role: 'requester' });
		const initialProps = {
			user: {
				isLoggedIn: true,
				message: {},
				error: '',
			},
			UdateUserInfo: jest.fn(),
			ViewUserInfo: jest.fn(),
			handleInput: jest.fn(),
			handleEdit: jest.fn(),
			changeEditMode: jest.fn(),
			preventDefault: jest.fn(),
		};

		const wrapper = renderDashboard(initialProps);
		expect(wrapper).toHaveLength(1);
	});

	it('Should successfully submit a login form', () => {
		jest.spyOn(jwt, 'decode').mockReturnValue({ role: 'requester' });
		const initialProps = {
			state: {
				isReadOnly: false,
				error: '',
				alert: '',
			},
			UdateUserInfo: jest.fn(),
			ViewUserInfo: jest.fn(),
			handleInput: jest.fn(),
			handleEdit: jest.fn(),
		};
		const wrapper = renderDashboard(initialProps);
		const click = {
			target: {
				value: 'Edit account',
			},
		};

		wrapper.find('#editinfo').simulate('click', click);
		const { isReadOnly } = wrapper.instance().state;
		expect(isReadOnly).toBe(false);
	});
	it('Should successfully edit form', () => {
		jest.spyOn(jwt, 'decode').mockReturnValue({ role: 'requester' });
		const initialProps = {
			state: {
				isReadOnly: false,
				error: '',
				alert: '',
			},
			UdateUserInfo: jest.fn(),
			ViewUserInfo: jest.fn(),
			handleInput: jest.fn(),
			handleEdit: jest.fn(),
		};
		const wrapper = renderDashboard(initialProps);
		const click = {
			target: {
				value: 'Efsdfsdffsdfsfsdfsdf',
			},
		};

		wrapper.find('#myinfo').simulate('click', click);
		const { isReadOnly } = wrapper.instance().state;
		expect(isReadOnly).toBe(true);
	});
	it('Should return error submit edit form', () => {
		jest.spyOn(jwt, 'decode').mockReturnValue({ role: 'requester' });
		const initialProps = {
			state: {
				isReadOnly: false,
				error: '',
				alert: '',
				avatar: null,
				uploadedPic: null,
				fullname: '',
			},
			UdateUserInfo: jest.fn(),
			ViewUserInfo: jest.fn(),
			handleInput: jest.fn(),
			handleEdit: jest.fn(),
		};
		const wrapper = renderDashboard(initialProps);
		const form = wrapper.find('form');
		const fullname = {
			preventDefault: jest.fn(),
			target: {
				id: 'fullname',
				value: '',
			},
		};
		wrapper.setState(initialProps.state);
		form.find('input[id="fullname"]').simulate('change', fullname);
		form.simulate('#btn_update');
		const p = wrapper.find('.repsponse');
		expect(p).toHaveLength(0);
	});
	it('should map the state to props', () => {
		jest.spyOn(jwt, 'decode').mockReturnValue({ role: 'requester' });
		mapDispatchToProps(jest.fn()).initialize({
			type: '',
			status: 'Account profile',
		});
		mapDispatchToProps(jest.fn()).ViewUserInfo();
		mapDispatchToProps(jest.fn()).UdateUserInfo({
			id: 1,
			email: 'ale@gmail.com',
			fullname: 'ale',
			gender: 'Male',
			avatar: 'ahsh',
		});
	});
	it('simulate update action', () => {
		jest.spyOn(jwt, 'decode').mockReturnValue({ role: 'requester' });
		const initialProps = {
			preventDefault: jest.fn(),
			state: {
				isReadOnly: false,
				isUpdate: true,
				error: '',
				alert: '',
				fullname: '',
			},
			UdateUserInfo: jest.fn(),
			ViewUserInfo: jest.fn(),
			handleInput: jest.fn(),
			handleEdit: jest.fn(),
			initialize: jest.fn(),
		};
		const wrapper = renderDashboard(initialProps);
		const state = { isUpdate: true, isReadOnly: false, fullname: 'ale' };
		wrapper.setState(state);
		wrapper.find('#btn_update').simulate('click');
		expect(wrapper.instance().state.fullname).toBe('ale');
		wrapper.setProps({ status: 'retrieve_success' });
		expect(wrapper.instance().props.status).toBe('retrieve_success');
		wrapper.setProps({ status: 'update_success' });
		expect(wrapper.instance().props.status).toBe('update_success');
	});
});
describe('FindForm', () => {
	test('Append id', async () => {
		const formData = new FormData();
		expect(formData).not.toBeNull();
	});
});
