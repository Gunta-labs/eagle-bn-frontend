import constants from '../constants';
import apis from '../../App/API/index';

export const socialLoginSucess = payload => ({
	type: constants.SOCIAL_LOGIN_SUCCESS,
	payload,
});

export const socialLoginFailure = error => ({
	type: constants.SOCIAL_LOGIN_ERROR,
	error,
});

export const socialLoginAction = (accessToken, accessType) => dispatch => {
	try {
		const res = apis.SocialaLoginAPI(accessToken, accessType);
		dispatch(socialLoginSucess(res.data));
		localStorage.setItem('barefoot_token', res.data.token);
	} catch (err) {
		console.log(err);
		dispatch(socialLoginFailure(err.response.data.message));
	}
};
