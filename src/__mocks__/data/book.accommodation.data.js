import axios from 'axios';

const bookingData = {
	successState: {
		bookings: {
			pending: false,
			payload: {
				msg: 'verified',
				status: 200,
			},
			error: null,
		},
		SingleAccomodations: {
			data: {
				AccommodationImages: [{ imageUrl: 'lelele' }],
			},
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	initialState: {
		bookings: {
			pending: false,
			payload: null,
			error: null,
		},
		SingleAccomodations: {
			data: undefined,
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	pendingState: {
		bookings: {
			pending: true,
			payload: null,
			error: null,
		},
		SingleAccomodations: {
			data: undefined,
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	errorState: {
		bookings: {
			pending: false,
			payload: null,
			error: {
				error: 'error',
			},
		},
		SingleAccomodations: {
			data: {
				AccommodationImages: [],
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

export default bookingData;
