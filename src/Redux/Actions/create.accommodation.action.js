import Api from '../../Api';
import constants from '../constants';

const createAccommodation = async (accommodation, token) => {
	try {
		const data = await Api.createAccommodation(accommodation, token);
		return {
			type: constants.ADD_ACCOMMODATION__SUCCESS,
			payload: data.data,
		};
	} catch (error) {
		return {
			type: constants.ADD_ACCOMMODATION__ERROR,
			error: error.response || error.message,
		};
	}
};

export default createAccommodation;
