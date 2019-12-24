import React from 'react';
import UserCard, { mapDispatchToProps } from '../../App/Components/UserCard';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('axios');

configure({ adapter: new Adapter() });

const renderUserCard = args => {
	const props = { ...args };
	return shallow(<UserCard {...props} />);
};

describe('should test user role card component', () => {
	it('Should render', () => {
		const initialProps = {
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

		const wrapper = renderUserCard(initialProps);
		expect(wrapper).toHaveLength(2);
	});
	it('Should  display a change role model', () => {
		const event = { preventDefault: jest.fn() };
		const initialProps = {
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
			],
			showModel: jest.fn(),
		};

		const wrapper = renderUserCard(initialProps);
		const btn = wrapper.find('#displayCard');
		btn.simulate('click', event);
		expect(wrapper.instance());
	});
});
