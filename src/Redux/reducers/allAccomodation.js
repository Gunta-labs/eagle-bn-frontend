const initialState = {
	data: null,
	error: null,
	pending: false,
};

const AllAccomodations = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'ACCOMODATION_SUCCESS':
			return {
				...state,
				data: payload,
				error: null,
				pending: false,
			};
		case 'ACCOMODATION_ERROR':
			return {
				...state,
				data: null,
				error: payload,
				pending: false,
			};
		case 'ACCOMODATION_PENDING':
			return {
				...state,
				data: null,
				error: null,
				pending: true,
			};
		case 'ACCOMMODATION_DELETE_SUCCESS':
			return {
				...state,
				data: state.data.filter(e => e.id !== action.payload.id),
			};

		default:
			return state;
	}
};

export default AllAccomodations;
