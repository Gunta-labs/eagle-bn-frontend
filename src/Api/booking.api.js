import axios from 'axios';
import baseURL from './config';
import getUser from '../helper/helper';

export const getBookings = async data => {
	const isHost = getUser() && (getUser().role === 'Tadmin' || getUser().role === 'host');
	const url = `${baseURL}bookings${isHost ? '/supplier' : ''}`;
	return axios.get(url, {
		headers: { Authorization: data },
	});
};
export const rateAccommodation = async (data, token, bookingId) =>
	axios.patch(`${baseURL}bookings/${bookingId}/rate`, data, {
		headers: { Authorization: token },
	});
