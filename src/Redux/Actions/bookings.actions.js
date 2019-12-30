import constants from '../constants';
import { getBookings, rateAccommodation } from '../../Api/booking.api';

const Booking = async token => {
	const t =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoicmVxdWVzdGVyQGdtYWlsLmNvbSIsInZlcmlmaWVkIjp0cnVlLCJyb2xlIjoicmVxdWVzdGVyIiwicmVtZW1iZXJNZSI6dHJ1ZSwiZnVsbG5hbWUiOiJyZXF1ZXN0ZXIiLCJpYXQiOjE1Nzc3NzA5MTIsImV4cCI6MTU3Nzg1NzMxMn0.s0Jx33YRzgMKLnbN6QtT_W-vkiDco9BynVDcjcXEEbY';
	try {
		const result = await getBookings(t);
		result.data.data = result.data.data.reverse();
		console.log(result.data);
		return {
			type: constants.GET_BOOKING_SUCCESS,
			payload: result.data,
		};
	} catch (err) {
		return {
			type: constants.GET_BOOKING_ERROR,
			error: err.response.data,
		};
	}
};

export const rateBooking = async (data, token, bookingId) => {
	const t =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoicmVxdWVzdGVyQGdtYWlsLmNvbSIsInZlcmlmaWVkIjp0cnVlLCJyb2xlIjoicmVxdWVzdGVyIiwicmVtZW1iZXJNZSI6dHJ1ZSwiZnVsbG5hbWUiOiJyZXF1ZXN0ZXIiLCJpYXQiOjE1Nzc3NzA5MTIsImV4cCI6MTU3Nzg1NzMxMn0.s0Jx33YRzgMKLnbN6QtT_W-vkiDco9BynVDcjcXEEbY';
	try {
		const result = await rateAccommodation(data, t, bookingId);
		console.log(result.data);
		return {
			type: constants.RATE_BOOKING_SUCCESS,
			payload: result.data,
		};
	} catch (err) {
		return {
			type: constants.RATE_BOOKING_ERROR,
			error: err.response.data,
		};
	}
};

export default Booking;
