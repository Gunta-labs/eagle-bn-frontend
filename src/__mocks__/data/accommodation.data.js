import axios from 'axios';
const data = {
	id: 5,
	userid: 1,
	name: 'house of hapiness',
	description: 'Everything you want',
	address: 'Kigali, Rwanda',
	availableSpace: '5 rooms',
	cost: 234,
	services: 'Everything you want',
	amenities: 'Everything you want',
	isAvailable: true,
	currency: 'USD',
	createdAt: '2019-12-13T08:26:57.612Z',
	updatedAt: '2019-12-13T08:26:57.612Z',
	AccommodationImages: [
		{
			imageurl:
				'http://res.cloudinary.com/barefootnomad/image/upload/v1576225617/a8bpj6z0rydxznuda48p.jpg',
		},
	],
};
const mockData = {
	successState: {
		SingleAccomodations: {
			pending: false,
			data,
			error: null,
			feedback: {
				data: {},
			},
		},
		AccomodationFeedback: {
			data: {
				feedbackList: [{ avatar: 'lellelle', author: 'christian' }],
				averageRating: 3,
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
		SingleAccomodations: {
			pending: false,
			data: null,
			error: null,
			feedback: {
				data: {},
			},
		},
		AccomodationFeedback: {
			data: {},
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	pendingState: {
		SingleAccomodations: {
			pending: true,
			data: null,
			error: null,
		},
		AccomodationFeedback: {
			data: {},
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	errorState: {
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
		AccomodationFeedback: {
			data: {
				feedbackList: { avatar: 'lellelle', author: 'christian' },
				averageRating: 3,
			},
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
			data: data,
		});
	},
	mockSuccessNull: () => {
		axios.get.mockResolvedValue({
			msg: 'msg',
			status: 200,
			data: { data: null },
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
		axios.get.mockImplementation(() => Promise.reject(data));
	},
	mockFailureNetwork: (payload = null) => {
		axios.get.mockImplementation(() => Promise.reject({ error: 'failed' }));
	},
};
export default {
	data,
	mockData,
};
