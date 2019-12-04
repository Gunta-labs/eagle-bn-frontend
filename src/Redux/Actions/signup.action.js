import Api from '../../Api';

const signup_success = user => ({
	type: 'SIGNUP_SUCCESS',
	user,
});

const signup_error = error => ({
	type: 'SIGNUP_ERROR',
	error,
});

export const signup = async user => {
	try {
		const user_ = await Api.signup(user);
		return signup_success(user_);
	} catch (error) {
		return signup_error(error.response.data.msg);
	}
};
