import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import filterRequest from '../../Redux/Actions/filter.request.action';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('Actions', () => {
	let store;

	beforeEach(() => {
		store = mockStore({});
	});
	it('dispatches getAllAccomodations action and returns Error', async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: { status: 404, msg: 'not found' },
				},
			}),
		);

		await store.dispatch(await filterRequest(''));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('FILTERED_REQUEST_ERROR');
	});

	it('dispatches getAllAccomodations action and returns success', async () => {
		mockAxios.get.mockResolvedValue({
			data: {},
		});

		await store.dispatch(await filterRequest(''));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('FILTERED_REQUEST');
	});
	it('dispatches authenticatins action and returns true', async () => {
		mockAxios.get.mockResolvedValue({});

		await store.dispatch(await filterRequest());
		const actions = store.getActions();
		expect(actions[0].type).toEqual('FILTERED_REQUEST_ERROR');
	});
});
