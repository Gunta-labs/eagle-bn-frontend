import axios from 'axios';
import baseURL from './config';

export const getBookings = async data =>
	axios.get(`${baseURL}bookings`, {
		headers: { Authorization: data },
	});
export const rateAccommodation = async (data, token, bookingId) =>
	axios.patch(`${baseURL}bookings/${bookingId}/rate`, data, {
		headers: { Authorization: token },
	});
