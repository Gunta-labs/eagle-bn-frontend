import { toast } from 'react-toastify';
import constants from '../constants';

export const socialLoginSucess = payload => ({
	type: constants.SOCIAL_LOGIN_SUCCESS,
	payload,
});

export const socialLoginFailure = error => ({
	type: constants.SOCIAL_LOGIN_ERROR,
	error,
});

export const socialLoginAction = () => dispatch => {
	try {
		localStorage.setItem('barefoot_token', '');
	} catch (err) {
		toast.error(err.response.data.message);
		dispatch(socialLoginFailure(err.response.data.message));
	}
};
