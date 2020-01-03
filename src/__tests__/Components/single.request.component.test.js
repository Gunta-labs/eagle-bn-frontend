import React from 'react';
import {
	SingleRequest,
	mapDispatchToProps,
	mapStateToProps,
} from '../../App/Pages/single.request.page';
import {
	initialProps,
	initialProps2,
	initialProps3,
	initialProps4,
} from '../../__mocks__/data/single.accomodation.data';
import RequestDetails from '../../App/Components/request.details.component';
import { RequestComment, mapDispatchToProp } from '../../App/Components/request.comments.component';
import DeleteComment from '../../App/Components/delete.comment.component';
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

const renderDeleteComment = args => {
	return mount(<DeleteComment {...args} />);
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

describe('Should render request details', () => {
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
		form.find('input').simulate('change', comment);
		form.simulate('submit', event);
		const { sendComment } = wrapper2.instance().props;
		let id = wrapper2.instance().props.props.match.params.id;
		expect(await sendComment).toBeCalledWith(id, { comment: 'thissss is ' });
	});
	it('Should successfully submit a reply comment form', async () => {
		const wrapper3 = renderRequestComment(initialProps);
		const form2 = wrapper3.find('.comment-form');
		const event = { preventDefault: jest.fn() };
		const comment = { target: { name: 'reply', value: 'thissss is ' } };
		form2.find('input').simulate('change', comment);
		form2.simulate('submit', event);
		const { sendReply } = wrapper3.instance().props;
		let id = wrapper3.instance().props.props.match.params.id;
		expect(await sendReply).toBeCalledWith(id, { comment: 'thissss is ', parent: '203' });
	});

	it('Should successfully check receivde props', () => {
		const wrapper3 = renderRequestComment(initialProps);
		wrapper3.setProps({ trash_success: true, edited_success: true });
		const { model, draftComment } = wrapper3.instance().state;
		expect(model).toEqual(false);
		expect(draftComment).toEqual('');
	});

	it('Should successfully open modal on reply comment', () => {
		const wrapper3 = renderRequestComment(initialProps2);
		const comment = { preventDefault: jest.fn() };
		wrapper3.find('.open-modal').simulate('click', comment);
		const { model } = wrapper3.instance().state;
		expect(model).toEqual(true);
	});

	it('Should call edit comment function', () => {
		const wrapper3 = renderRequestComment(initialProps3);
		wrapper3.setState({ editMode: true, commentId: 203 });
		const form = wrapper3.find('form.comment-form2');
		const event = { preventDefault: jest.fn() };
		const comment = { target: { name: 'draftComment', value: 'thissss is ' } };
		form.find('input').simulate('change', comment);
		form.simulate('submit', event);
		const { editComment } = wrapper3.instance().props;
		expect(editComment).toBeCalledWith(1, 203, { comment: 'thissss is ' });
	});

	it('Should call edit button function', () => {
		const wrapper3 = renderRequestComment(initialProps4);
		wrapper3.setState({ editMode: false });
		const btn = wrapper3.find('.edit-btn2').at(0);
		const event = { target: { name: 'draftComment', value: 'thissss is ' } };
		btn.simulate('click', event);
		jest.spyOn(wrapper3.instance(), 'editButton');
		const { editMode } = wrapper3.instance().state;
		expect(editMode).toEqual(true);
	});

	it('should map the state to props', () => {
		mapDispatchToProp(jest.fn()).getComments(1);
		mapDispatchToProp(jest.fn()).loading_reply_comment();
		mapDispatchToProp(jest.fn()).loading_sent_comment();
		mapDispatchToProp(jest.fn()).sendReply(1, {});
		mapDispatchToProp(jest.fn()).sendComment(1, {});
		mapDispatchToProp(jest.fn()).loading_comment();
		mapDispatchToProp(jest.fn()).trashComment(1, {});
		mapDispatchToProp(jest.fn()).editComment(1, {}, {});
		mapDispatchToProp(jest.fn()).loading_trash_comment();
	});
});

describe('Mount delete Comments', () => {
	it('Should render the component', () => {
		const initialProps = {
			close: jest.fn(),
			trash: jest.fn(),
			id: true,
			commentId: '',
		};

		const wrapper = renderDeleteComment(initialProps);
		expect(wrapper).toHaveLength(1);
	});

	it('Should click the delete button ', () => {
		const initialProp5 = {
			close: jest.fn(),
			trash: jest.fn(),
			id: true,
			commentId: '',
			load: jest.fn(),
		};

		const wrapper = renderDeleteComment(initialProp5);
		const btn = wrapper.find('button').at(1);
		btn.simulate('click');
		expect(wrapper.find('button')).toHaveLength(2);
	});
});
