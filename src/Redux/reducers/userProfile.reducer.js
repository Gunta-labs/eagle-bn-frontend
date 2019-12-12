const initialState = {
	user: {},
	error: {},
	status: '',
};
const UserProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'Data retrieved':
			return { ...state, user: action.payload, status: 'retrieve_success' };
		case 'Retrieve faillure':
			return { ...state, error: action.payload, status: 'retrieve_fail' };

		case 'Profile updated':
			return { ...state, user: action.payload, status: 'update_success' };
		case 'Update faillure':
			return { ...state, error: action.payload, status: 'update_fail' };
		default:
			return state;
	}
};
export default UserProfileReducer;
