import axios from 'axios';

export default {
	not_started: {
		ResetPasswordReducer: {
			requestResetStatus: 'not_started',
			resetPasswordStatus: 'not_started',
		},
		handleSubmit: jest.fn(),
		changeHandler: jest.fn(),
		handleChangeS: jest.fn(),
		handleChangeF: jest.fn(),
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	success: {
		ResetPasswordReducer: { requestResetStatus: 'success', resetPasswordStatus: 'success' },
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	not_match: {
		ResetPasswordReducer: { requestResetStatus: 'success', resetPasswordStatus: 'unmatch' },
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	failed: {
		ResetPasswordReducer: { requestResetStatus: 'failed', resetPasswordStatus: 'failed' },
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	error: {
		ResetPasswordReducer: { requestResetStatus: 'error', resetPasswordStatus: 'error' },
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	pending: {
		ResetPasswordReducer: { requestResetStatus: 'pending', resetPasswordStatus: 'pending' },
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	rrpMockSuccess: (payload = null) => {
		const data = {
			status: 201,
			payload,
		};
		axios.post.mockResolvedValue({
			data,
			status: 201,
		});
	},
	rrpMockFailure: (payload = null) => {
		const data = {
			response: {
				status: 409,
				payload,
			},
		};
		axios.post.mockImplementation(() => Promise.reject(data));
	},
	rpMockSuccess: (payload = null) => {
		const data = {
			status: 200,
			payload,
		};
		axios.patch.mockResolvedValue({
			data,
			status: 200,
		});
	},
	rpMockFailure: (payload = null) => {
		const data = {
			response: {
				status: 400,
				payload,
			},
		};
		axios.patch.mockImplementation(() => Promise.reject(data));
	},
	rpMockFailure2: (payload = null) => {
		const data = {
			response: {
				status: 500,
				payload,
			},
		};
		axios.patch.mockImplementation(() => Promise.reject(data));
	},
	rrpMockFailure2: (payload = null) => {
		const data = {
			response: {
				status: 500,
				payload,
			},
		};
		axios.post.mockImplementation(() => Promise.reject(data));
	},
};
