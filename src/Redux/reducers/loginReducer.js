import constants from '../constants/index';

const initialState = {
	isLoggedIn: false,
	message: null,
	error: null,
	logPending: false,
};

const LoginReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case constants.LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				message: payload,
				error: null,
				logPending: false,
			};
		case constants.LOGIN_FAILURE:
			return {
				...state,
				isLoggedIn: false,
				message: null,
				error: payload,
				logPending: false,
			};
		case 'login_pending':
			return { ...state, logPending: true };
		default:
			return state;
	}
};

export default LoginReducer;
