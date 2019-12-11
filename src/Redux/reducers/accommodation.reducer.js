import constants from '../constants';

const initialState = {
	pending: false,
	payload: null,
	error: null,
};

const AccommodationReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.ADD_ACCOMMODATION_PENDING:
			return { ...state, pending: true, payload: null, error: null };
		case constants.ADD_ACCOMMODATION__SUCCESS:
			return { ...state, pending: false, payload: action.payload, error: null };
		case constants.ADD_ACCOMMODATION__ERROR:
			return { ...state, pending: false, payload: null, error: action.error };
		default:
			return state;
	}
};

export default AccommodationReducer;
