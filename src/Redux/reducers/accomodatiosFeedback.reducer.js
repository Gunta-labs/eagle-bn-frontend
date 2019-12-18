const initialState = {
	data: null,
	error: null,
	pending: false,
};

const AccomodationFeedback = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SINGLE_ACCOMODATION_FEEDBACK_SUCCESS':
			return {
				...state,
				data: payload,
				error: null,
				pending: false,
			};
		case 'SINGLE_ACCOMODATION__FEEDBACK_PENDING':
			return {
				...state,
				data: null,
				error: null,
				pending: true,
			};
		case 'SINGLE_ACCOMODATION_FEEDBACK_ERROR':
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

export default AccomodationFeedback;
