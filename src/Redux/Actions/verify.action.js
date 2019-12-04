import constants from '../constants';
import apis from '../../Api';

const VerifyUser = token => {
	return async dispatch => {
		dispatch({
			type: constants.VERIFY_PENDING,
			pending: true,
		});
		const result = await apis.verifyUser(token);
		if (result.status === 200) {
			return dispatch({
				type: constants.VERIFY_SUCCESS,
				verifyResult: result,
			});
		}
		if (result.status === 401) {
			return dispatch({
				type: constants.VERIFY_ERROR,
				error: result,
			});
		}
	};
};

export default VerifyUser;
