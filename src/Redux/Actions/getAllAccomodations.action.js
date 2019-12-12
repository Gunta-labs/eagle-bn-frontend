import apis from '../../Api/index';

const getAllAccomodations = async () => {
	try {
		const AllAccomodation = await apis.getAllAccomodations();
		const { data } = AllAccomodation.data;
		return {
			type: 'ACCOMODATION_SUCCESS',
			payload: data,
		};
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: 'ACCOMODATION_ERROR',
			payload: message,
		};
	}
};

export default getAllAccomodations;
