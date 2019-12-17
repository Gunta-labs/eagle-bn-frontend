import apis from '../../Api/index';

export const facebookLoginSucess = payload => ({
	type: 'FACEBOOK_LOGIN_SUCCESS',
	payload,
});

export const facebookLoginFailure = error => ({
	type: 'FACEBOOKL_LOGIN_ERROR',
	error,
});

export const facebookLoginAction = payload => async dispatch => {
	try {
		const res = await apis.facebookLoginAPI(payload);
		localStorage.setItem('barefoot_token', res.data.data.token);
		dispatch(facebookLoginSucess(res.data));
	} catch (err) {
		dispatch(facebookLoginFailure(err.response.data.message));
	}
};
