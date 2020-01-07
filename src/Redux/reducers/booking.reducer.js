import constants from '../constants';

const initialState = {
	pending: false,
	payload: null,
	error: null,
	ratingError: null,
	ratingPayload: null,
	ratingPending: false,
};

const BookingReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.BOOKING_PENDING:
			return { ...state, pending: true, payload: null, error: null };
		case constants.BOOKING_SUCCESS:
			return { ...state, pending: false, payload: action.payload, error: null };
		case constants.BOOKING_ERROR:
			return { ...state, pending: false, payload: null, error: action.error };
		default:
			return state;
	}
};

export default BookingReducer;
