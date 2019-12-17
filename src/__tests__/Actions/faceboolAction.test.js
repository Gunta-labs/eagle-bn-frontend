import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { facebookLoginAction } from '../../Redux/Actions/facebookLoginAction';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('Actions', () => {
	let store;
	const facebook = {
		user: 'facebook@gmail.com',
	};

	beforeEach(() => {
		store = mockStore({});
	});

	it('dispatches authenticatins action and returns true', async () => {
		mockAxios.post.mockResolvedValue({
			data: {
				status: 201,
				msg: 'User logged successfully',
				data: {
					userid: 5,
					fullname: 'facebook',
					email: 'facebooker@gmail.com',
					isverified: true,
					token: '5tsaMaYPkBf3hv_8evtwI8ubr19BpbnN41soODH4umg',
				},
			},
		});

		await store.dispatch(await facebookLoginAction(facebook));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('FACEBOOK_LOGIN_SUCCESS');
	});
});
