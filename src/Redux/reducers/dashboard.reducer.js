const initialState = {
	user: {},
	error: '',
	status: '',
	alert: 'text-primary font-weight-bolder',
};
const UserProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'retrieve_success':
			return {
				...state,
				user: action.payload,
				alert: 'alert alert-primary',
				status: 'Account profile',
			};
		case 'retrieve_fail':
			return {
				...state,
				error: action.payload,
				alert: 'alert alert-warning',
				status: 'No data found',
			};

		case 'update_success':
			return {
				...state,
				user: action.payload,
				alert: 'alert alert-success',
				status: 'Account profile. Updated successfully!',
			};
		case 'update_fail':
			return {
				...state,
				error: action.error,
				alert: 'alert alert-warning',
				status: 'Account profile. Update faillure. ' + action.error.msg,
			};
		default:
			return state;
	}
};
export default UserProfileReducer;
