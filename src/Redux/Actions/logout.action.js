import constants from '../constants';
import api from '../../Api';

export default async token => {
	try {
		const result = await api.logout(token);
		return { type: constants.LOGOUT_SUCCESS, payload: result.data };
	} catch (error) {
		window.localStorage.removeItem('barefoot_token');
		return { type: constants.LOGOUT_SUCCESS };
	}
};
