import constants from '../constants';

const initialState = {
	access_token: '',
	error: {},
};

const SocialLoginReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.SOCIAL_LOGIN_SUCCESS:
			return Object.assign({}, state, {
				...state,
				access_token: action.payload,
				error: null,
			});
		case constants.SOCIAL_LOGIN_ERROR:
			return Object.assign({}, state, {
				...state,
				error: action.error,
			});
		default:
			return state;
	}
};

export default SocialLoginReducer;
