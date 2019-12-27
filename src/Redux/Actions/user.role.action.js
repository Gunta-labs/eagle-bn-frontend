import apis from '../../Api/index';

export const getAllUsers = async token => {
	try {
		const AllUsers = await apis.getUsersRoles(token);
		const { data } = AllUsers.data;
		return {
			type: 'get_users_success',
			payload: data,
		};
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: 'get_users_error',
			payload: message,
		};
	}
};

export const changeModelStatus = payload => {
	return {
		type: 'change_model_status',
		payload,
	};
};
