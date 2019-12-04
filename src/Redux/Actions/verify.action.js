import constants from '../constants';
import apis from '../../Api';

const VerifyUser = async token => {
	try {
		const result = await apis.verifyUser(token);
		return {
			type: constants.VERIFY_SUCCESS,
			payload: result,
		};
	} catch (err) {
		return {
			type: constants.VERIFY_ERROR,
			error: err.response.data,
		};
	}
};

export default VerifyUser;
