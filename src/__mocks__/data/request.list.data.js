import axios from 'axios';
const data = {
	id: 1,
	returnTime: '2019-12-06 08:57:21.133 +00:00',
	country: 'Rwanda',
	city: 'kigali',
	status: 'rejected',
	timeZone: 'africa/kigali',
	createdAt: '2019-12-06T08:57:21.133Z',
	updatedAt: '2019-12-06T08:57:21.133Z',
	UserId: 3,
	Trips: [
		{
			id: 1,
			departureTime: '2019-12-06 08:57:21.179 +00:00',
			country: 'Uganda',
			city: 'Kampala',
			reason: 'I just like that place',
			accommodationId: null,
			createdAt: '2019-12-06T08:57:21.179Z',
			updatedAt: '2019-12-06T08:57:21.179Z',
		},
		{
			id: 2,
			departureTime: '2019-12-06 08:57:21.179 +00:00',
			country: 'Kenya',
			city: 'Nairobi',
			reason: 'I do not have any reason',
			accommodationId: null,
			createdAt: '2019-12-06T08:57:21.179Z',
			updatedAt: '2019-12-06T08:57:21.179Z',
		},
	],
};
const data2 = {
	id: 1,
	returnTime: '2019-12-06 08:57:21.133 +00:00',
	country: 'Ugandaganda',
	city: 'kampala',
	status: 'rejected',
	timeZone: 'africa/kigali',
	createdAt: '2019-12-06T08:57:21.133Z',
	updatedAt: '2019-12-06T08:57:21.133Z',
	UserId: 3,
	Trips: [
		{
			id: 1,
			departureTime: '2019-12-06 08:57:21.179 +00:00',
			country: 'Uganda',
			city: 'Kampala',
			reason: 'I just like that place',
			accommodationId: null,
			createdAt: '2019-12-06T08:57:21.179Z',
			updatedAt: '2019-12-06T08:57:21.179Z',
		},
	],
};
const mockData = {
	successState: {
		Request: {
			pending: false,
			payload: { data: [data, data, data, data, data, data, data, data, data2] },
			error: null,
		},
	},
	initialState: {
		Request: {
			pending: false,
			payload: null,
			error: null,
		},
	},
	pendingState: {
		Request: {
			pending: true,
			payload: null,
			error: null,
		},
	},
	errorState: {
		Request: {
			pending: false,
			payload: null,
			error: {
				error: 'error',
			},
		},
	},
	mockSuccess: () => {
		axios.get.mockResolvedValue({
			msg: 'msg',
			status: 200,
			data: [data, data, data, data, data, data, data, data],
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
	},
};
export default {
	data,
	mockData,
};
