import constants from '../constants';
import { requestResetPassword, resetPassword } from '../../Api/reset.password.api';

export function sendRequestReset(data) {
	return async dispatch => {
		try {
			dispatch({ type: constants.REQUEST_RESET_PASSWORD_PENDING, payload: {} });
			const res = await requestResetPassword(data);
			if (res.status === 201) {
				dispatch({ type: constants.REQUEST_RESET_SUCCESS, payload: {} });
			}
		} catch (error) {
			const { response } = error;
			if (response && (response.status === 400 || response.status === 409)) {
				dispatch({ type: constants.REQUEST_RESET_FAILED, payload: {} });
			} else {
				dispatch({ type: constants.REQUEST_RESET_ERROR, payload: {} });
			}
		}
	};
}

export function sendResetPassword(data, token) {
	return async dispatch => {
		try {
			if (data.password !== data.confirmPassword) {
				return dispatch({ type: constants.RESET_PASSWORD_UNMATCH, payload: {} });
			}
			dispatch({ type: constants.RESET_PASSWORD_PENDING, payload: {} });
			const res = await resetPassword(data, token);
			if (res.status === 200) {
				dispatch({ type: constants.RESET_PASSWORD_SUCCESS, payload: {} });
			}
		} catch (error) {
			const { response } = error;
			if (response && response.status === 400) {
				dispatch({ type: constants.RESET_PASSWORD_FAILED, payload: {} });
			} else {
				dispatch({ type: constants.RESET_PASSWORD_ERROR, payload: {} });
			}
		}
	};
}
