import React from 'react';
import {
	SingleRequest,
	mapDispatchToProps,
	mapStateToProps,
} from '../../App/Pages/single.request.page';
import RequestDetails from '../../App/Components/request.details.component';
import { RequestComment, mapDispatchToProp } from '../../App/Components/request.comments.component';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const renderRequest = args => {
	const props = { ...args };
	return shallow(<SingleRequest {...props} />);
};

const renderRequestDetails = args => {
	return shallow(<RequestDetails {...args} />);
};
const renderRequestComment = args => {
	return mount(<RequestComment {...args} />);
};

const initialProps = {
	reply_pending: false,
	reply_success: 'Okk',
	loading_reply_comment: jest.fn(),
	sendCommentReply: jest.fn(),
	sendReply: jest.fn(),
	loading_sent_comment: jest.fn(),
	send_success: 'Okk',
	send_pending: false,
	sendComment: jest.fn(),
	handleInput: jest.fn(),
	getComments: jest.fn(),
	loading_comment: jest.fn(),
	pending_comment: false,
	comment_error: null,
	props: {
		match: {
			params: 1,
		},
		userId: 3,
	},
	comments: [
		{
			id: 203,
			comment: 'secont coomment',
			createdAt: '2019-12-31T19:40:55.091Z',
			userId: 3,
			'User.RoleId': 5,
			'User.fullname': 'requester',
			replies: [
				{
					id: 205,
					comment: 'reply 1',
					createdAt: '2019-12-31T19:41:56.511Z',
					userId: 3,
					'User.RoleId': 5,
					'User.fullname': 'requester',
				},
			],
		},
	],
};

describe('should test single request component', () => {
	it('Should render when there is data', () => {
		const initialProps = {
			data: {
				isLoggedIn: true,
				message: {},
				error: '',
			},
			match: { params: 1 },
			loading: jest.fn(),
			singleRequest: jest.fn(),
			details: jest.fn(),
			pending: false,
			error: jest.fn(),
		};

		const wrapper = renderRequest(initialProps);
		expect(wrapper).toHaveLength(1);
	});

	it('Should render when pending', () => {
		const initialProps = {
			data: {
				isLoggedIn: true,
				message: {},
				error: '',
			},
			match: { params: 1 },
			loading: jest.fn(),
			singleRequest: jest.fn(),
			details: jest.fn(),
			pending: true,
			error: jest.fn(),
		};

		const wrapper = renderRequest(initialProps);
		expect(wrapper).toHaveLength(1);
	});

	it('should map dispatch to props', () => {
		mapDispatchToProps(jest.fn()).singleRequest();
		mapDispatchToProps(jest.fn()).loading({
			type: 'GETREQUEST_PENDING',
			payload: null,
			error: null,
		});
	});
	it('should map state to props', () => {
		const state = { Request: { pending: true, payload: '', error: '' }, replyComment: {} };
		mapStateToProps(state);
	});
});

describe('Should render request comment', () => {
	it('Should render when there is data', () => {
		const initialProps = {
			data: {
				id: 1,
				returnTime: '2019-12-04 11:32:56.113 +00:00',
				country: 'RW',
				city: 'kigali-ngali',
				status: 'pending',
				timeZone: 'africa/kigali',
				createdAt: '2019-12-04T11:32:56.113Z',
				updatedAt: '2019-12-04T11:32:56.113Z',
				UserId: 3,
				Trips: [
					{
						id: 1,
						departureTime: '2019-12-04 11:32:56.192 +00:00',
						country: 'UG',
						city: 'Kampala',
						reason: 'I just like that place',
						updatedAt: '2019-12-04T11:32:56.192Z',
					},
				],
			},
		};

		const wrapper = renderRequestDetails(initialProps);
		expect(wrapper).toHaveLength(1);
	});
	it('Should render when there is data and date is undefined', () => {
		const initialProps = {
			data: {
				id: 1,
				country: 'RW',
				city: 'kigali-ngali',
				status: 'pending',
				timeZone: 'africa/kigali',
				createdAt: '2019-12-04T11:32:56.113Z',
				updatedAt: '2019-12-04T11:32:56.113Z',
				UserId: 3,
				Trips: [
					{
						id: 1,
						country: 'UG',
						city: 'Kampala',
						reason: 'I just like that place',
						updatedAt: '2019-12-04T11:32:56.192Z',
					},
				],
			},
		};

		const wrapper = renderRequestDetails(initialProps);
		expect(wrapper).toHaveLength(1);
	});
});

describe('Mount request Comments', () => {
	it('render when pending', () => {
		const initialProps = {
			getComments: jest.fn(),
			loading_comment: jest.fn(),
			pending_comment: true,
			comment_error: '',
			props: {
				match: {
					params: 1,
				},
			},
		};

		const wrapper = renderRequestComment(initialProps);
		expect(wrapper).toHaveLength(1);
	});
	it('render when the is an error', () => {
		const initialProps = {
			getComments: jest.fn(),
			loading_comment: jest.fn(),
			pending_comment: false,
			comment_error: 'No comment found',
			props: {
				match: {
					params: 1,
				},
			},
		};

		const wrapper = renderRequestComment(initialProps);
		expect(wrapper).toHaveLength(1);
	});

	it('render comments', () => {
		const wrapper = renderRequestComment(initialProps);
		expect(wrapper).toHaveLength(1);
	});
	it('Should successfully submit a send comment form', async () => {
		const wrapper2 = renderRequestComment(initialProps);
		const form = wrapper2.find('#submit-form');
		const event = { preventDefault: jest.fn() };
		const comment = { target: { name: 'comment', value: 'thissss is ', id: 'comment' } };
		form.find('#comment').simulate('change', comment);
		form.simulate('submit', event);
		const { sendComment } = wrapper2.instance().props;
		expect(await sendComment).toBeCalledWith(undefined, { comment: 'thissss is ' });
	});
	it('Should successfully submit a reply comment form', async () => {
		const wrapper2 = renderRequestComment(initialProps);
		const form = wrapper2.find('.comment-form');
		const event = { preventDefault: jest.fn() };
		const comment = { target: { name: 'comment', value: 'thissss is ' } };
		form.find('input').simulate('change', comment);
		form.simulate('submit', event);
		const { sendReply } = wrapper2.instance().props;
		expect(await sendReply).toBeCalledWith(undefined, { comment: 'thissss is ', parent: '203' });
	});

	it('should map the state to props', () => {
		mapDispatchToProp(jest.fn()).getComments(1);
		mapDispatchToProp(jest.fn()).loading_reply_comment();
		mapDispatchToProp(jest.fn()).loading_sent_comment();
		mapDispatchToProp(jest.fn()).sendReply(1, {});
		mapDispatchToProp(jest.fn()).sendComment(1, {});
		mapDispatchToProp(jest.fn()).loading_comment();
	});
});
