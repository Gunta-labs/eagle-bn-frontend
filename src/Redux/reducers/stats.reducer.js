import constants from '../constants';

const initialState = {
	pending: false,
	payload: null,
	error: null,
};

const stats = (state = initialState, action) => {
	switch (action.type) {
		case constants.STAT_PENDING:
			return Object.assign({}, state, {
				pending: true,
				payload: null,
				error: null,
			});
		case constants.STAT_SUCCESS:
			return Object.assign({}, state, {
				pending: false,
				payload: action.payload,
				error: null,
			});
		case constants.STAT_ERROR:
			return Object.assign({}, state, {
				pending: false,
				payload: null,
				error: action.error,
			});
		default:
			return state;
	}
};

export default stats;
