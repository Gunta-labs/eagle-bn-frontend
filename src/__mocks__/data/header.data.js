import axios from 'axios';
const data = {
	id: 3,
	modelId: 5,
	modelName: 'Requests',
	type: 'new_request',
	isRead: false,
	createdAt: '2019-11-13T13:47:56.972Z',
	updatedAt: '2019-11-13T13:47:56.972Z',
	userId: 1,
};
const data1 = {
	id: 3,
	modelId: 5,
	modelName: 'Requests',
	type: 'new_comment',
	isRead: false,
	createdAt: '2019-11-13T13:47:56.972Z',
	updatedAt: '2019-11-13T13:47:56.972Z',
	userId: 1,
};
const data2 = {
	id: 3,
	modelId: 5,
	modelName: 'Requests',
	type: 'request_approved',
	isRead: false,
	createdAt: '2019-11-13T13:47:56.972Z',
	updatedAt: '2019-11-13T13:47:56.972Z',
	userId: 1,
};
const data3 = {
	id: 3,
	modelId: 5,
	modelName: 'Requests',
	type: 'request_rejected',
	isRead: false,
	createdAt: '2019-11-13T13:47:56.972Z',
	updatedAt: '2019-11-13T13:47:56.972Z',
	userId: 1,
};
const data4 = {
	id: 3,
	modelId: 5,
	modelName: 'Requests',
	type: 'other',
	isRead: true,
	createdAt: '2019-11-13T13:47:56.972Z',
	updatedAt: '2019-11-13T13:47:56.972Z',
	userId: 1,
};
const mockData = {
	successState: {
		Notification: {
			payload: [data, data1, data2, data3, data4],
			error: null,
			pending: null,
		},
		Logout: {
			payload: {},
		},
		destSats: {
			payload: {
				data: [{}],
			},
		},
		accommodations: {
			payload: {
				data: [{}],
			},
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
		axios.patch.mockImplementation(() => Promise.reject(data));
	},
	mockFailureNetwork: (payload = null) => {
		axios.get.mockImplementation(() => Promise.reject({ error: 'failed' }));
	},
};
export default {
	data,
	mockData,
};
