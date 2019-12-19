import constants from '../constants';
import apis from '../../Api';

const VerifyUser = async token => {
	try {
		const result = await apis.getRequest(token);
		result.data = result.data.reverse();
		return {
			type: constants.GETREQUEST_SUCCESS,
			payload: result,
		};
	} catch (err) {
		return {
			type: constants.GETREQUEST_ERROR,
			error: err.response.data,
		};
	}
};

export default VerifyUser;
