import constants from '../constants';

const initialState = {
	pending: false,
	payload: null,
	error: null,
};

const RequestReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.UPDATE_REQUEST_PENDING:
			return { ...state, pending: true, payload: null, error: null };
		case constants.UPDATE_REQUEST_SUCCESS:
			return { ...state, pending: false, payload: action.payload, error: null };
		case constants.UPDATE_REQUEST_ERROR:
			return { ...state, pending: false, payload: null, error: action.error };
		default:
			return state;
	}
};

export default RequestReducer;
