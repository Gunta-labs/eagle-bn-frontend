import apis from '../../Api/index';
import constants from '../constants/index';

const authentication = async payload => {
	try {
		const login = await apis.loginUser(payload);
		const { data } = login.data;
		localStorage.setItem('barefoot_token', data.token);
		return {
			type: constants.LOGIN_SUCCESS,
			payload: data,
		};
	} catch (error) {
		const message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: constants.LOGIN_FAILURE,
			payload: message,
		};
	}
};

export default authentication;
