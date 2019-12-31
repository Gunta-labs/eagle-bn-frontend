import apis from '../../Api/index';
import constants from '../constants/index';

const getAllAccomodationsByFilter = async filter => {
	try {
		const AllAccomodation = await apis.getAllAccomodationsByFilter(filter);
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

export default getAllAccomodationsByFilter;
