import * as checkToken from '../../helper/helper';
import axios from 'axios';
import baserUrl from '../../Api/config';

export const retrieveUserData = () => async dispatch => {
	try {
		const res = await axios.get(`${baserUrl}/users/${checkToken.default().userId}/profile`);
		dispatch({
			type: 'retrieve_success',
			payload: res.data.data,
		});
	} catch (error) {
		dispatch({
			type: 'retrieve_fail',
			error: error.response ? error.response.data : { error: error.message },
		});
	}
};

export const updateUserProfile = payload => async dispatch => {
	try {
		const res = await axios.patch(`${baserUrl}/users/profile`, payload, {
			headers: {
				Authorization: checkToken.token,
				contentType: 'application/x-www-form-urlencoded',
			},
		});
		dispatch({
			type: 'update_success',
			payload: res.data.data,
		});
	} catch (error) {
		dispatch({
			type: 'Update fail',
			error: error.response ? error.response.data : { error: error.message },
		});
	}
};
