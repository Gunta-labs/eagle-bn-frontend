import axios from 'axios';

const verifyData = {
	successState: {
		accommodation: {
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
	},
	initialState: {
		accommodation: {
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
		accommodation: {
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
		accommodation: {
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
	},
	mockSuccess: (payload = null) => {
		const data = {
			msg: 'msg',
			status: 201,
			payload,
		};
		axios.post.mockResolvedValue({
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
		axios.post.mockImplementationOnce(() => Promise.reject(data));
	},
	mockNetworkFailure: (payload = null) => {
		axios.post.mockImplementationOnce(() =>
			Promise.reject({
				message: 'network failure',
			}),
		);
	},
};

export default verifyData;
