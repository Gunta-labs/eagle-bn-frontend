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
const data2 = {
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
	AccommodationImages: [],
};
const mockData = {
	successState: {
		accomodation: {
			pending: false,
			data: [data, data, data, data, data, data, data, data, data, data, data2],
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
		Logout: {
			payload: {},
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
		DeleteAccommodations: {
			data,
			delete_error: null,
			deleted: true,
		},
	},
	initialState: {
		accomodation: {
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
		Logout: {
			payload: {},
		},
		DeleteAccommodations: {
			data: null,
			error: null,
			deleted: false,
		},
	},
	pendingState: {
		accomodation: {
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
		Logout: {
			payload: {},
		},
		DeleteAccommodations: {
			data,
			delete_error: null,
			deleted: true,
		},
	},
	errorState: {
		accomodation: {
			pending: false,
			data: null,
			error: {
				error: 'error',
			},
			feedback: {
				data: {},
			},
		},
		Logout: {
			payload: {},
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
		DeleteAccommodations: {
			data: null,
			error: '',
			deleted: false,
		},
	},
	errorState2: {
		accomodation: {
			pending: false,
			data: null,
			error: {
				response: {},
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
		Logout: {
			payload: {},
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
		DeleteAccommodations: {
			data: null,
			error: '',
			deleted: false,
		},
	},
	mockSuccess: () => {
		axios.get.mockResolvedValue({
			msg: 'msg',
			status: 200,
			data: [data],
		});
		axios.delete.mockResolvedValue({
			data,
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
				data: {
					msg: 'elel',
				},
			},
		};
		axios.get.mockImplementation(() => Promise.reject(data));
		axios.delete.mockImplementation(() => Promise.reject(data));
	},
	mockFailureNetwork: (payload = null) => {
		axios.get.mockImplementation(() => Promise.reject({ error: 'failed' }));
		axios.delete.mockImplementation(() => Promise.reject({ error: 'failed' }));
	},
};
export default {
	data,
	mockData,
};
