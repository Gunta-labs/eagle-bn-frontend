import axios from 'axios';

const verifyData = {
	successState: {
		UpdateAccomodation: {
			pending: false,
			payload: {
				msg: 'verified',
				status: 200,
			},
			error: null,
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
		getOneAcc: {
			pending: false,
			payload: null,
			error: 'hello',
		},
		SingleAccomodations: {
			pending: false,
			data: null,
			error: {
				error: 'error',
			},
			feedback: {
				data: {},
			},
		},
	},
	initialState: {
		UpdateAccomodation: {
			pending: false,
			payload: null,
			error: null,
		},
		getOneAcc: {
			pending: false,
			payload: null,
			error: 'hello',
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
		SingleAccomodations: {
			pending: false,
			data: null,
			error: {
				error: 'error',
			},
			feedback: {
				data: {},
			},
		},
	},
	pendingState: {
		UpdateAccomodation: {
			pending: true,
			payload: null,
			error: null,
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
		SingleAccomodations: {
			pending: false,
			data: null,
			error: {
				error: 'error',
			},
			feedback: {
				data: {},
			},
		},
	},
	errorState: {
		UpdateAccomodation: {
			pending: false,
			payload: null,
			error: {
				error: 'error',
			},
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
		getOneAcc: {
			pending: false,
			payload: null,
			error: 'hello',
		},
		SingleAccomodations: {
			pending: false,
			data: null,
			error: {
				error: 'error',
			},
			feedback: {
				data: {},
			},
		},
	},
	mockSuccess: (payload = null) => {
		const data = {
			msg: 'msg',
			status: 201,
			payload,
		};
		axios.patch.mockResolvedValue({
			data,
		});
	},
	mockFailure: (payload = null) => {
		const data = {
			response: {
				msg: 'msg',
				status: 401,
				payload,
			},
		};
		axios.patch.mockImplementationOnce(() => Promise.reject(data));
	},
	mockNetworkFailure: (payload = null) => {
		axios.patch.mockImplementationOnce(() =>
			Promise.reject({
				message: 'network failure',
			}),
		);
	},
};

export default verifyData;
