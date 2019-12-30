import axios from 'axios';
import baseURL from './config';

export const getBookings = async data =>
	axios.get(`http://localhost:3000/api/v1/bookings`, {
		headers: { Authorization: data },
	});
export const rateAccommodation = async (data, token, bookingId) =>
	axios.patch(`http://localhost:3000/api/v1/bookings/${bookingId}/rate`, data, {
		headers: { Authorization: token },
	});
