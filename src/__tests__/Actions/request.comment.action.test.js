import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { getComments, sendReply, sendComment } from '../../Redux/Actions/request.comments.action';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('get comment Actions', () => {
	let store;
	const requestId = 3;

	beforeEach(() => {
		store = mockStore({});
	});
	it('dispatches getComments action and returns false', async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: {
						status: 400,
						msg: 'The email and/or password is invalid',
					},
				},
			}),
		);

		await store.dispatch(await getComments(requestId));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('GET_REQUEST_COMMENT_ERROR');
	});

	it('dispatches authentication action and returns no internet connection', async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				responses: {
					data: {
						status: 400,
						msg: 'The email and/or password is invalid',
					},
				},
			}),
		);

		await store.dispatch(await getComments(requestId));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('GET_REQUEST_COMMENT_ERROR');
	});
	it('dispatches getComments action and returns false', async () => {
		mockAxios.get.mockResolvedValue({
			data: {
				status: 404,
				msg: 'Comment required',
			},
		});

		await store.dispatch(await getComments(1));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('GET_REQUEST_COMMENT_ERROR');
	});
	it('dispatches getComments action and returns true', async () => {
		mockAxios.get.mockResolvedValue({
			data: {
				status: 201,
				msg: 'User logged successfully',
				data: {},
			},
		});

		await store.dispatch(await getComments(1));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('GET_REQUEST_COMMENT_SUCCESS');
	});
});

describe('sendReply Actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({});
	});
	it('dispatches sendReply action and returns false', async () => {
		mockAxios.post.mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: {
						status: 400,
						msg: 'The email and/or password is invalid',
					},
				},
			}),
		);

		await store.dispatch(await sendReply(1, { comment: 'yes', parent: '2' }));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SEND_REQUEST_COMMENT_REPLY_ERROR');
	});

	it('dispatches sendReply action and returns no internet connection', async () => {
		mockAxios.post.mockImplementationOnce(() =>
			Promise.reject({
				responses: {
					data: {
						status: 400,
						msg: 'The email and/or password is invalid',
					},
				},
			}),
		);

		await store.dispatch(await sendReply(1, { comment: 'yes', parent: '2' }));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SEND_REQUEST_COMMENT_REPLY_ERROR');
	});
	it('dispatches sendReply action and returns true', async () => {
		mockAxios.post.mockResolvedValue({
			data: {
				status: 201,
				msg: 'User logged successfully',
				data: {},
			},
		});

		await store.dispatch(await sendReply(1, { comment: 'yes', parent: '2' }));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SEND_REQUEST_COMMENT_REPLY_SUCCESS');
	});
});

describe('send comment Actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({});
	});
	it('dispatches sendComment action and returns false', async () => {
		mockAxios.post.mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: {
						status: 400,
						msg: 'The email and/or password is invalid',
					},
				},
			}),
		);

		await store.dispatch(await sendComment(1, { comment: 'yes', parent: '2' }));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SEND_REQUEST_COMMENT_ERROR');
	});

	it('dispatches sendComment action and returns no internet connection', async () => {
		mockAxios.post.mockImplementationOnce(() =>
			Promise.reject({
				responses: {
					data: {
						status: 400,
						msg: 'The email and/or password is invalid',
					},
				},
			}),
		);

		await store.dispatch(await sendComment(1, { comment: 'yes', parent: '2' }));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SEND_REQUEST_COMMENT_ERROR');
	});
	it('dispatches sendComment action and returns true', async () => {
		mockAxios.post.mockResolvedValue({
			data: {
				status: 201,
				msg: 'User logged successfully',
				data: {},
			},
		});

		await store.dispatch(await sendComment(1, { comment: 'yes', parent: '2' }));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SEND_REQUEST_COMMENT_SUCCESS');
	});
});
