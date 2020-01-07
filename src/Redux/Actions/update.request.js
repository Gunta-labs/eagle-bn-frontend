import Api from '../../Api';
import constants from '../constants';

const updateRequest = async (request, token, reqId) => {
	try {
		const data = await Api.updateRequest(request, token, reqId);
		return {
			type: constants.UPDATE_REQUEST_SUCCESS,
			payload: data.data,
		};
	} catch (error) {
		return {
			type: constants.UPDATE_REQUEST_ERROR,
			error: error.response,
		};
	}
};

export default updateRequest;
