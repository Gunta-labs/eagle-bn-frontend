import axios from 'axios';
const data = {
	id: 1,
	AccommodationId: 1,
	numberOfSpace: 1,
	UserId: 3,
	start: '2019-09-01T22:00:00.000Z',
	end: '2019-09-01T22:00:00.000Z',
	createdAt: '2019-11-13T08:58:38.971Z',
	updatedAt: '2019-11-13T08:58:38.971Z',
	Accommodation: {
		userid: 1,
		name: 'hotel karisimbi',
		description: 'Vellllllll',
		address: 'Kampala, Uganda',
		availableSpace: '2 rooms ',
		cost: 45000,
		services: 'sauna, theater',
		amenities: 'free wifi, TV',
		isAvailable: true,
		currency: 'USD',
		AccommodationImages: [
			{
				imageurl:
					'http://res.cloudinary.com/barefootnomad/image/upload/v1573637628/vceswnop4ndrd0cocdj8.jpg',
			},
			{
				imageurl:
					'http://res.cloudinary.com/barefootnomad/image/upload/v1573637630/plubdbku5ai9lx9acw65.jpg',
			},
		],
	},
	Rating: {
		BookingId: 1,
		feedback: 'second rating',
		rating: 2,
	},
};
const data2 = {
	id: 1,
	AccommodationId: 1,
	numberOfSpace: 1,
	UserId: 3,
	start: '2019-09-01T22:00:00.000Z',
	end: '2019-09-01T22:00:00.000Z',
	createdAt: '2019-11-13T08:58:38.971Z',
	updatedAt: '2019-11-13T08:58:38.971Z',
	Accommodation: {
		userid: 1,
		name: 'hotel karisimbi',
		description: 'Vellllllll',
		address: 'Kampala, Uganda',
		availableSpace: '2 rooms ',
		cost: 45000,
		services: 'sauna, theater',
		amenities: 'free wifi, TV',
		isAvailable: true,
		currency: 'USD',
		AccommodationImages: [],
	},
};
const data3 = {
	id: 1,
	AccommodationId: 1,
	numberOfSpace: 1,
	UserId: 3,
	start: '2020-09-01T22:00:00.000Z',
	end: '2020-09-01T22:00:00.000Z',
	createdAt: '2019-11-13T08:58:38.971Z',
	updatedAt: '2019-11-13T08:58:38.971Z',
	Accommodation: {
		userid: 1,
		name: 'hotel karisimbi',
		description: 'Vellllllll',
		address: 'Kampala, Uganda',
		availableSpace: '2 rooms ',
		cost: 45000,
		services: 'sauna, theater',
		amenities: 'free wifi, TV',
		isAvailable: true,
		currency: 'USD',
		AccommodationImages: [],
	},
};

const mockData = {
	successState: {
		Booking: {
			pending: false,
			payload: { data: [data, data2, data3, data, data, data, data, data2, data3] },
			error: null,
			ratingPayload: { msg: 'successfully rated' },
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	successState2: {
		Booking: {
			pending: false,
			payload: { data: [data, data2, data3, data, data, data, data, data2, data3] },
			error: null,
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	initialState: {
		Booking: {
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
		Booking: {
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
		Booking: {
			pending: false,
			payload: null,
			error: {
				error: 'error',
			},
			ratingError: { data: 'error' },
			ratingPending: true,
		},
		Notification: {
			payload: [],
			error: null,
			pending: null,
		},
	},
	errorState2: {
		Booking: {
			pending: false,
			payload: null,
			error: {
				error: 'error',
			},
			ratingError: { message: 'network failure' },
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
			data: { data: [data, data, data, data, data, data, data, data] },
		});
		axios.patch.mockResolvedValue({
			msg: 'successfully rated',
			status: 200,
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
		axios.patch.mockImplementationOnce(() => Promise.reject(data));
	},
	mockFailureNet: (payload = null) => {
		axios.get.mockImplementationOnce(() => Promise.reject({ message: 'network failure' }));
		axios.patch.mockImplementationOnce(() => Promise.reject({ message: 'network failure' }));
	},
};
export default {
	data,
	mockData,
	data2,
};
