const initialState = {
	data: null,
	error: null,
};

const AllAccomodations = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'ACCOMODATION_SUCCESS':
			return {
				...state,
				data: payload,
				error: null,
			};
		case 'ACCOMODATION_ERROR':
			return {
				...state,
				data: null,
				error: payload,
			};

		default:
			return state;
	}
};

export default AllAccomodations;
