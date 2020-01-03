import axios from 'axios';

export const mockSuccess = (payload = null) => {
	const data = {
		msg: 'msg',
		status: 200,
		payload,
	};
	axios.get.mockResolvedValue({
		data,
	});
};
export const mockFailure = (err = null) => {
	const data = {
		response: {
			msg: 'msg',
			status: 401,
			err,
		},
	};
	axios.get.mockImplementationOnce(() => Promise.reject(data));
};
