import constants from '../constants';
import apis from '../../Api';

const stats = async token => {
	try {
		const result = await apis.getStats(token);
		return {
			type: constants.STAT_SUCCESS,
			payload: result.data,
		};
	} catch (err) {
		return {
			type: constants.STAT_ERROR,
			error: err.response.data,
		};
	}
};

export default stats;
