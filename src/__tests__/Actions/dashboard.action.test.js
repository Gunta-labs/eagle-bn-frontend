import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { updateUserProfile, retrieveUserData } from '../../Redux/Actions/dashboard.action';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('Dashbord data retrieve actions', () => {
	let store;
	const payload = {
		id: 1,
		email: 'ale@gmail.com',
		fullname: 'ale',
		gender: 'Maled',
		phone: '0785235353',
		avatar: '',
	};

	beforeEach(() => {
		store = mockStore({});
	});
	it('dispatches user profile info and data not found', async () => {
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

		await store.dispatch(await retrieveUserData(payload));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('retrieve_fail');
	});
});
describe('Dashbord data rupdate actions', () => {
	let store;
	const payload = {
		id: 'd',
		email: 'ale@gmail.com',
		fullname: 'alexx',
		gender: 'Female',
		phone: '0785235353',
		avatar: 'jjfd',
	};

	beforeEach(() => {
		store = mockStore({});
	});
	it('dispatches user profile info and data not found to edit', async () => {
		mockAxios.patch.mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: {
						status: 400,
						msg: 'Data not found',
					},
				},
			}),
		);

		await store.dispatch(await updateUserProfile(payload));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('Update fail');
	});
	it('dispatches profile and return data', async () => {
		mockAxios.patch.mockResolvedValue({
			data: {
				status: 200,
				msg: 'Account profile. profile updated successfully',
				data: {
					userid: 1,
					fullname: 'alex',
				},
			},
		});

		await store.dispatch(await updateUserProfile(payload));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('update_success');
	});
});
