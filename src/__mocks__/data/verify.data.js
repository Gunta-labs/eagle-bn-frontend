import axios from 'axios';

const verifyData = {
	successState: {
		Verify: {
			pending: false,
			payload: {
				msg: 'verified',
				status: 200,
			},
			error: null,
		},
	},
	initialState: {
		Verify: {
			pending: false,
			payload: null,
			error: null,
		},
	},
	pendingState: {
		Verify: {
			pending: true,
			payload: null,
			error: null,
		},
	},
	errorState: {
		Verify: {
			pending: false,
			payload: null,
			error: {
				error: 'error',
			},
		},
	},
	mockSuccess: (payload = null) => {
		const data = {
			msg: 'msg',
			status: 200,
			payload,
		};
		axios.get.mockResolvedValue({
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
		axios.get.mockImplementationOnce(() => Promise.reject(data));
	},
};

export default verifyData;
