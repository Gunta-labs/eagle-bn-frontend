const initialState = {
	pending: false,
	payload: null,
	error: null,
	modelStatus: 'not_started',
	changeRoleStatus: 'not_started',
};

const UserRoleReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'pending':
			return { ...state, pending: true, payload: null, error: null };
		case 'get_users_success':
			return { ...state, pending: false, payload: action.payload, error: null };
		case 'get_users_error':
			return { ...state, pending: false, payload: null, error: action.error };
		case 'change_model_status':
			return { ...state, modelStatus: action.payload };
		case 'change_role_status':
			return { ...state, changeRoleStatus: action.payload };
		default:
			return state;
	}
};

export default UserRoleReducer;
