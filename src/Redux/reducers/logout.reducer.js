import constants from '../constants/index';

const initialState = {
	pending: false,
	payload: null,
};

const Logout = (state = initialState, action) => {
	switch (action.type) {
		case constants.LOGOUT_SUCCESS:
			return {
				...state,
				pending: false,
				payload: action.payload,
			};
		case constants.LOGOUT_PENDING:
			return {
				...state,
				pending: true,
				payload: null,
			};
		default:
			return state;
	}
};

export default Logout;
