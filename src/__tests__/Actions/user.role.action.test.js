import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { getAllUsers } from '../../Redux/Actions/user.role.action';
import Apis from '../../Api/';
import * as checkTock from '../../helper/helper';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('users data retrieve actions', () => {
	let store;
	const payload = {
		id: 1,
		email: 'ale@gmail.com',
		fullname: 'ale',
		Role: {
			roleName: 'manager',
			roleValue: 'manager',
		},
	};

	beforeEach(() => {
		store = mockStore({});
	});
	it('dispatches user data info and data not found', async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: {
						status: 400,
						msg: 'Data not found',
					},
				},
			}),
		);

		await store.dispatch(await getAllUsers(payload));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('get_users_error');
	});
});
describe('Dashbord data rupdate actions', () => {
	let store;
	const payload = {
		id: 1,
		email: 'ale@gmail.com',
		fullname: 'ale',
		Role: {
			roleName: 'manager',
			roleValue: 'manager',
		},
		new_role: 'host',
	};

	beforeEach(() => {
		store = mockStore({});
	});
});
