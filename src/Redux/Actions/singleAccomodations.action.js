import apis from '../../Api/index';

export const singleAccomodation = async id => {
	try {
		const result = await apis.singleAccomodation(id);
		const { data } = result.data;
		if (data !== null) {
			return {
				type: 'SINGLE_ACCOMODATION_SUCCESS',
				payload: data,
			};
		} else {
			return {
				type: 'SINGLE_ACCOMODATION_ERROR',
				payload: 'No Accomodation with id',
			};
		}
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: 'SINGLE_ACCOMODATION_ERROR',
			payload: message,
		};
	}
};

export const GetFeedback = async id => {
	try {
		const feedback = await apis.GetFeeback(id);
		const { data } = feedback.data;
		return {
			type: 'SINGLE_ACCOMODATION_FEEDBACK_SUCCESS',
			payload: data,
		};
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: 'SINGLE_ACCOMODATION_FEEDBACK_ERROR',
			payload: message,
		};
	}
};
