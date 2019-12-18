import apis from '../../Api/index';
import constants from '../constants/index';

const getAllAccomodations = async () => {
	try {
		const AllAccomodation = await apis.getAllAccomodations();
		const { data } = AllAccomodation.data;
		return {
			type: constants.ACCOMODATION_SUCCESS,
			payload: data,
		};
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: constants.ACCOMODATION_ERROR,
			payload: message,
		};
	}
};

export default getAllAccomodations;
