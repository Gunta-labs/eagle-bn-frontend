const initialState = {
	user: {},
	signup: false,
	signing: false,
};

export const signupReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SIGNUP_SUCCESS':
			return {
				signup: true,
				user: action.user,
				signing: false,
			};
		case 'SIGNUP_ERROR':
			return {
				...state,
				error: action.error,
				signing: false,
			};

		case 'SIGNUP_PENDING':
			return {
				signing: true,
			};
		default:
			return initialState;
	}
};
