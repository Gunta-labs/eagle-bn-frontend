import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { singleAccomodation, GetFeedback } from '../../Redux/Actions/singleAccomodations.action';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('Actions', () => {
	let store;

	let id = 1;

	beforeEach(() => {
		store = mockStore({});
	});
	it('dispatches singleAccomodation action and returns Error', async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: { status: 404, msg: 'jhsbduh' },
				},
			}),
		);

		await store.dispatch(await singleAccomodation(id));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SINGLE_ACCOMODATION_ERROR');
	});

	it('dispatches singleAccomodation action and returns success', async () => {
		mockAxios.get.mockResolvedValue({
			data: {},
		});

		await store.dispatch(await singleAccomodation(id));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SINGLE_ACCOMODATION_SUCCESS');
	});
	it('dispatches singleAccomodation action and returns false', async () => {
		mockAxios.get.mockResolvedValue({
			data: {
				data: null,
			},
		});

		await store.dispatch(await singleAccomodation(id));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SINGLE_ACCOMODATION_ERROR');
	});
	it('dispatches singleAccomodation action and returns true', async () => {
		mockAxios.get.mockResolvedValue({});

		await store.dispatch(await singleAccomodation(id));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SINGLE_ACCOMODATION_ERROR');
	});

	it('dispatches GetFeedback action and returns true', async () => {
		mockAxios.get.mockResolvedValue({});

		await store.dispatch(await GetFeedback(id));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SINGLE_ACCOMODATION_FEEDBACK_ERROR');
	});

	it('dispatches GetFeedback action and returns success', async () => {
		mockAxios.get.mockResolvedValue({
			data: {},
		});

		await store.dispatch(await GetFeedback(id));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SINGLE_ACCOMODATION_FEEDBACK_SUCCESS');
	});
	it('dispatches GetFeedback action and returns Error', async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: { status: 404, msg: 'jhsbduh' },
				},
			}),
		);

		await store.dispatch(await GetFeedback(id));
		const actions = store.getActions();
		expect(actions[0].type).toEqual('SINGLE_ACCOMODATION_FEEDBACK_ERROR');
	});
});
