import constants from '../constants/index';
import apis from '../../Api';

const destSats = async () => {
	try {
		const result = await apis.destinationStats();
		return {
			type: constants.STATS_SUCCESS,
			payload: result.data,
		};
	} catch (err) {
		return {
			type: constants.STATS_ERROR,
			error: err.response.data,
		};
	}
};

export const accomodations = async () => {
	try {
		const result = await apis.accomodations();
		return {
			type: constants.ACCOMODATION_SUCCESS,
			payload: result.data,
		};
	} catch (err) {
		return {
			type: constants.ACCOMODATION_ERROR,
			error: err.response.data,
		};
	}
};

export default destSats;
