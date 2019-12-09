import apis from '../../Api/index';

export const facebookLoginSucess = payload => ({
	type: 'FACEBOOK_LOGIN_SUCCESS',
	payload,
});

export const facebookLoginFailure = error => ({
	type: 'FACEBOOKL_LOGIN_ERROR',
	error,
});

export const facebookLoginAction = payload => dispatch => {
	try {
		const res = apis.facebookLoginAPI(payload);
		dispatch(facebookLoginSucess(res.data));
	} catch (err) {
		dispatch(facebookLoginFailure(err.response.data.message));
	}
};
