import axios from 'axios';

export default {
	success: {
		MakeTripRequest: {
			tripRequestStatus: 'success',
			message: 'Your trip request was initiated successfully, wait for your manager to approve it!',
			messageClass: 'alert alert-success',
		},
		addDestination: jest.fn(),
		handleValueChange: jest.fn(),
		showDestinationsForm: jest.fn(),
		handleSubmit: jest.fn(),
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	not_started: {
		MakeTripRequest: {
			tripRequestStatus: 'not_started',
			message: 'Create Request',
			messageClass: 'text-primary font-weight-bolder',
		},
		addDestination: jest.fn(),
		handleValueChange: jest.fn(),
		showDestinationsForm: jest.fn(),
		handleSubmit: jest.fn(),
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	mockSuccess: status => {
		const data = {
			status: status,
			data: {},
		};
		axios.post.mockResolvedValue({
			data,
			status: status,
		});
	},
	mockFailure: (status, payload = null) => {
		const data = {
			response: {
				status: status,
				data: !payload ? { msg: { timeZone: '["d", ["y"]]' } } : { msg: 'message' },
			},
		};
		axios.post.mockImplementation(() => Promise.reject(data));
	},
};
