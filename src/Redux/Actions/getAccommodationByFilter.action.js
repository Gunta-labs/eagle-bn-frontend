import apis from '../../Api/index';
import constants from '../constants/index';
import { toast } from 'react-toastify';

const getAllAccomodationsByFilter = async filter => {
	try {
		const AllAccomodation = await apis.getAllAccomodationsByFilter(filter);
		const { data } = AllAccomodation.data;
		if (data === undefined) toast.error(`No accommodation(s) with (" ${filter} ") found`);
		return {
			type: constants.ACCOMODATION_SUCCESS,
			payload: data,
		};
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		toast.error(message);
		return {
			type: constants.ACCOMODATION_ERROR,
			payload: message,
		};
	}
};

export default getAllAccomodationsByFilter;
