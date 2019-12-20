import apis from '../../Api/index';
import constants from '../constants/index';

const filterRequest = async query => {
	try {
		let token = localStorage.getItem('barefoot_token');
		const result = await apis.filterRequest(query, token);
		const { data } = result;
		if (data.status === 404) {
			return {
				type: constants.FILTERED_REQUEST_ERROR,
				payload: data,
			};
		}
		return {
			type: constants.FILTERED_REQUEST,
			payload: data,
		};
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: constants.FILTERED_REQUEST_ERROR,
			payload: message,
		};
	}
};

export default filterRequest;
