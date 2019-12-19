import Api from '../../Api';
import constants from '../constants';

const bookAccommodation = async (booking, token) => {
	try {
		const data = await Api.bookAccommodation(booking, token);
		return {
			type: constants.BOOKING_SUCCESS,
			payload: data.data,
		};
	} catch (error) {
		return {
			type: constants.BOOKING_ERROR,
			error: error.response || error.message,
		};
	}
};

export default bookAccommodation;
