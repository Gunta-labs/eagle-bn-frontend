import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authentication from '../../redux/Actions/login.actions';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('Actions', () => {
	let store;
	const payload = {
		email: 'manger@gmail.com',
		password: 'eagle123!',
	};

	beforeEach(() => {
		store = mockStore({});
	});
	it('dispatches authentication action and returns false', async () => {
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

		await store.dispatch(await authentication(payload));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('LOGIN_FAILURE');
	});

	it('dispatches authentication action and returns no internet connection', async () => {
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

		await store.dispatch(await authentication(payload));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('LOGIN_FAILURE');
	});

	it('dispatches authenticatins action and returns true', async () => {
		mockAxios.post.mockResolvedValue({
			data: {
				status: 201,
				msg: 'User logged successfully',
				data: {
					userid: 5,
					fullname: 'manager',
					email: 'manager@gmail.com',
					isverified: true,
					token: '5tsaMaYPkBf3hv_8evtwI8ubr19BpbnN41soODH4umg',
				},
			},
		});

		await store.dispatch(await authentication(payload));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('LOGIN_SUCCESS');
	});
});
