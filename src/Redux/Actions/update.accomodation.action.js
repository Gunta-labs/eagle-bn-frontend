import Api from '../../Api';
import constants from '../constants';

const updateAccommodation = async (accommodation, token, id) => {
	try {
		const data = await Api.updateAccommodation(accommodation, token, id);
		return {
			type: constants.UPDATE_ACCOMMODATION_SUCCESS,
			payload: data.data,
		};
	} catch (error) {
		return {
			type: constants.UPDATE_ACCOMMODATION_ERROR,
			error: error.response,
		};
	}
};

export default updateAccommodation;
