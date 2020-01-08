const initialState = {
	data: null,
	error: null,
	pending: true,
	accommodation: false,
};

const SingleAccomodations = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SINGLE_ACCOMODATION_SUCCESS':
			return {
				...state,
				data: payload,
				error: null,
				pending: false,
				accommodation: true,
			};
		case 'SINGLE_ACCOMODATION_PENDING':
			return {
				...state,
				data: null,
				error: null,
				pending: true,
			};
		case 'SINGLE_ACCOMODATION_ERROR':
			return {
				...state,
				data: null,
				error: payload,
				pending: false,
			};

		default:
			return state;
	}
};

export default SingleAccomodations;
