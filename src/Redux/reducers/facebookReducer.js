const initialState = {
	user: {},
	error: '',
	isLoggedIn: false,
};
const FacebookLoginReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FACEBOOK_LOGIN_SUCCESS':
			return {
				...state,
				user: action.payload,
				isLoggedIn: true,
			};
		case 'FACEBOOKL_LOGIN_ERROR':
			return {
				...state,
				error: action.payload,
				isLoggedIn: false,
			};
		default:
			return state;
	}
};
export default FacebookLoginReducer;
