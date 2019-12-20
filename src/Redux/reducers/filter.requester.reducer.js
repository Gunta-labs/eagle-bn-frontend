import constants from '../constants/index';

const initialState = {
	filtered_data: null,
	error: null,
};

const filterRequest = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case constants.FILTERED_REQUEST:
			return {
				filtered_data: payload,
				error: null,
			};
		case constants.FILTERED_REQUEST_ERROR:
			return {
				filtered_data: null,
				error: payload,
			};
		default:
			return {
				...state,
			};
	}
};

export default filterRequest;
