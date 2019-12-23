import axios from 'axios';
const data = {
	id: 4,
	fullname: 'dummy',
	email: 'dummy@gmail.com',
	avatar: '',
	Role: {
		id: 5,
		roleName: 'requester',
		roleValue: 'requester',
		avatar: '',
	},
};
const data2 = {
	id: 7,
	fullname: 'hgcvjfg',
	avatar: '',
	email: '',
	Role: {
		id: 5,
		roleName: 'requester',
		roleValue: 'requester',
	},
};

const mockData = {
	successState: {
		Request: {
			pending: false,
			payload: { data: [data, data, data2] },
			error: null,
			avatar: '',
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
			data: [data, data, data],
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
	data2,
	mockData,
};
