import apis from '../../Api/index';
import constants from '../constants/index';

const singleRequest = async requestId => {
	try {
		const token = localStorage.getItem('barefoot_token');
		const result = await apis.getSingleRequest(requestId, token);
		const { data } = result.data;
		return {
			type: constants.GETREQUEST_SUCCESS,
			payload: data,
			error: null,
		};
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: constants.GETREQUEST_ERROR,
			payload: null,
			error: message,
		};
	}
};

export default singleRequest;
