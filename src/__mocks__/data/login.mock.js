import axios from 'axios';

export const user = {
	email: 'jnc@jdn.com',
	password: 'manager',
};

export const errResp = {
	isLoggedIn: false,
	message: '',
	error: 'This is an error',
};

export const successResp = {
	isLoggedIn: false,
	message: '',
	error: 'This is an error',
};

export const mockSuccess = (payload = null) => {
	const data = {
		msg: 'msg',
		status: 200,
		payload,
	};
	axios.post.mockResolvedValue({
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
	axios.post.mockImplementationOnce(() => Promise.reject(data));
};
