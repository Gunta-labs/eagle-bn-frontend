import constants from '../constants/index';

const initialState = {
	isLoggedIn: false,
	message: null,
	error: null,
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
			};
		case constants.LOGIN_FAILURE:
			return {
				...state,
				isLoggedIn: false,
				message: null,
				error: payload,
			};
		default:
			return state;
	}
};

export default LoginReducer;
