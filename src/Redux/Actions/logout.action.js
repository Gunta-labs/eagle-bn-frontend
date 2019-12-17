import constants from '../constants';
import api from '../../Api';

export default async token => {
	const result = await api.logout(token);
	return { type: constants.LOGOUT_SUCCESS, payload: result.data };
};
