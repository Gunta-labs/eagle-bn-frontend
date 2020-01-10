import axios from 'axios';
const data = {
	status: 200,
	msg: 'all trip statistics',
	data: {
		days: {
			period_name: 'days',
			period_num: '1',
			num_trips: 0,
			period_from: '2020-01-07T05:54:28.543Z',
			period_to: '2020-01-08T05:54:28.563Z',
		},
		weeks: {
			period_name: 'weeks',
			period_num: '1',
			num_trips: 0,
			period_from: '2020-01-01T05:54:28.543Z',
			period_to: '2020-01-08T05:54:28.563Z',
		},
		months: {
			period_name: 'months',
			period_num: '1',
			num_trips: 0,
			period_from: '2019-12-08T05:54:28.544Z',
			period_to: '2020-01-08T05:54:28.563Z',
		},
	},
};
const mockData = {
	successState: {
		getStats: {
			pending: false,
			payload: data,
			error: null,
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	initialState: {
		getStats: {
			pending: false,
			payload: null,
			error: null,
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	pendingState: {
		getStats: {
			pending: true,
			payload: null,
			error: null,
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	errorState: {
		getStats: {
			pending: false,
			payload: null,
			error: data,
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	mockSuccess: () => {
		axios.get.mockResolvedValue({
			msg: 'msg',
			status: 200,
			data: [data, data, data, data, data, data, data, data],
		});
	},
	mockFailure: (payload = null) => {
		const data = {
			response: {
				msg: 'msg',
				status: 404,
				payload,
			},
		};
		axios.get.mockImplementationOnce(() => Promise.reject(data));
	},
};
export default {
	data,
	mockData,
};
