import apis from '../../Api/index';
import constants from '../constants/index';
import { toast } from 'react-toastify';

export const singleAccomodation = async id => {
	try {
		const result = await apis.singleAccomodation(id);
		const { data } = result.data;
		if (data !== null) {
			return {
				type: constants.SINGLE_ACCOMODATION_SUCCESS,
				payload: data,
			};
		} else {
			return {
				type: constants.SINGLE_ACCOMODATION_ERROR,
				payload: `No accommodation with id ${id}`,
			};
		}
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		toast.error(message);
		return {
			type: constants.SINGLE_ACCOMODATION_ERROR,
			payload: message,
		};
	}
};

export const GetFeedback = async id => {
	try {
		const feedback = await apis.GetFeeback(id);
		const { data } = feedback.data;
		return {
			type: constants.SINGLE_ACCOMODATION_FEEDBACK_SUCCESS,
			payload: data,
		};
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: constants.SINGLE_ACCOMODATION_FEEDBACK_ERROR,
			payload: message,
		};
	}
};

export const deleteAccommodation = async (token, id) => {
	try {
		const res = await apis.DeleteAccommodation(token, id);
		const { data } = res;
		data.id = id;
		toast.success('deleted successfully');
		return {
			type: 'ACCOMMODATION_DELETE_SUCCESS',
			payload: data,
		};
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		toast.error(message);
		return {
			type: 'ACCOMMODATION_DELETE_ERROR',
			payload: message,
		};
	}
};
