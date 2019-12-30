import constants from '../constants';

const initialState = {
	pending: false,
	payload: null,
	error: null,
};

const BookingReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.GET_BOOKING_PENDING:
			return { ...state, pending: true, payload: null, error: null };
		case constants.GET_BOOKING_SUCCESS:
			return { ...state, pending: false, payload: action.payload, error: null };
		case constants.GET_BOOKING_ERROR:
			return { ...state, pending: false, payload: null, error: action.error };
		case constants.RATE_BOOKING_PENDING:
			return { ...state, ratingPending: true, ratingPayload: null, ratingError: null };
		case constants.RATE_BOOKING_SUCCESS:
			return { ...state, ratingPending: false, ratingPayload: action.payload, ratingError: null };
		case constants.RATE_BOOKING_ERROR:
			return { ...state, ratingPending: false, ratingPayload: null, ratingError: action.error };
		default:
			return state;
	}
};

export default BookingReducer;
