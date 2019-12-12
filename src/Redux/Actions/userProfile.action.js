import jwtDecode from 'jwt-decode';
import axios from 'axios';
import baserUrl from '../../Api/config';

const token = localStorage.getItem('barefoot_token');
const loggedUser = jwtDecode(token);

export const retrieveUserData = () => async dispatch => {
	try {
		const res = await axios.get(`${baserUrl}/users/${loggedUser.userId}/profile`);
		dispatch({
			type: 'Data retrieved',
			payload: res.data.data,
		});
	} catch (error) {
		dispatch({
			type: 'Retrieve faillure',
			payload: error.response ? error.response.data : { error: error.message },
		});
	}
};

export const updateUserProfile = payload => async dispatch => {
	try {
		console.log(payload);
		const res = await axios.patch(`${baserUrl}/users/profile`, payload, {
			headers: {
				Authorization: token,
			},
		});

		dispatch({
			type: 'Profile updated',
			payload: res.data.data,
		});
	} catch (error) {
		dispatch({
			type: 'Update faillure',
			payload: error.response ? error.response.data : { error: error.message },
		});
		console.log(payload);
	}
};
