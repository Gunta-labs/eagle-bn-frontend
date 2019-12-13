import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import destSats, { accomodations } from '../../Redux/Actions/destination.actions';

const mockStore = configureMockStore([thunk]);
applyMiddleware(promiseMiddleware);

describe('Places Actions', () => {
	let store;
	beforeEach(() => {
		store = mockStore({});
	});
	it('rejects dispatches places action', async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				response: { data: { status: 400 } },
			}),
		);

		await store.dispatch(await destSats());
		const actions = store.getActions();
		expect(actions[0].type).toEqual('STATS_ERROR');
	});
	it('succeeds dispatches places action', async () => {
		mockAxios.get.mockResolvedValue({
			data: {
				status: 200,
				msg: 'Destinations Travelled',
				data: [
					{
						country: 'NG',
						city: 'lagos',
						'N of visitors': '2',
					},
					{
						country: 'UG',
						city: 'Kampala',
						'N of visitors': '1',
					},
					{
						country: 'KE',
						city: 'Nairobi',
						'N of visitors': '1',
					},
				],
			},
		});

		await store.dispatch(await destSats());
		const actions = store.getActions();
		expect(actions[0].type).toEqual('STATS_SUCCESS');
	});
});

describe('Destination Actions', () => {
	let store;
	beforeEach(() => {
		store = mockStore({});
	});
	it('rejects dispatches accomodation action', async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				response: { data: { status: 400 } },
			}),
		);

		await store.dispatch(await accomodations());
		const actions = store.getActions();
		expect(actions[0].type).toEqual('ACCOMODATION_ERROR');
	});
	it('succeeds dispatches accomodation action', async () => {
		mockAxios.get.mockResolvedValue({
			data: {
				status: 200,
				msg: 'Destinations Travelled',
				data: [
					{
						id: 1,
						userid: 1,
						name: 'hotel',
						description: 'the first hotel in region',
						address: 'kigali',
						availableSpace: 'rooms and pool',
						cost: 200000,
						services: 'wifi, breakfast',
						amenities: '',
						isAvailable: true,
						currency: 'USD',
						createdAt: '2019-12-03T22:40:49.155Z',
						updatedAt: '2019-12-03T22:40:49.155Z',
						AccommodationImages: [],
					},
				],
			},
		});

		await store.dispatch(await accomodations());
		const actions = store.getActions();
		expect(actions[0].type).toEqual('ACCOMODATION_SUCCESS');
	});
});
