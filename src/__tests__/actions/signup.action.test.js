import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { signup } from '../../Redux/Actions/signup.action';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('Actions', () => {
	let store;
	const payload = {
		fullname: 'rumbiiha',
		email: 'rswaibaa@gmail.com',
		password: 'Kanyanyama01%',
		confirmPassword: 'Kanyanyama01%',
	};

	beforeEach(() => {
		store = mockStore({});
	});
	it('dispatches signup action and returns false', async () => {
		mockAxios.post.mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: {
						status: 400,
						msg: 'this email exists',
					},
				},
			}),
		);

		await store.dispatch(await signup(payload));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SIGNUP_ERROR');
	});

	it('dispatches signup action and returns true', async () => {
		mockAxios.post.mockResolvedValue({
			data: {
				status: 201,
				msg: 'Account created successfully',
				data: {
					recieveEmails: true,
					id: 48,
					email: 'rswaibaasddsdssddsds@gmail.com',
					fullname: 'rumbiiha',
					updatedAt: '2019-12-10T07:52:47.279Z',
					createdAt: '2019-12-10T07:52:47.279Z',
					lineManager: 5,
					RoleId: 5,
					Role: 'requester',
				},
			},
		});

		await store.dispatch(await signup(payload));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SIGNUP_SUCCESS');
	});
});
