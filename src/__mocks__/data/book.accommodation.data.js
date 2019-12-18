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
