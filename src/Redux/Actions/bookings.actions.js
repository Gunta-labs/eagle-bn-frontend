import constants from '../constants';
import { getBookings, rateAccommodation } from '../../Api/booking.api';

const Booking = async token => {
	try {
		const result = await getBookings(token);
		if (result.data.data) {
			result.data.data = result.data.data.sort((a, b) => {
				return b.id - a.id;
			});
			return {
				type: constants.GET_BOOKING_SUCCESS,
				payload: result.data,
			};
		} else throw new Error('No bookings found');
	} catch (err) {
		return {
			type: constants.GET_BOOKING_ERROR,
			error: err.response ? err.response.data : err.message,
		};
	}
};

export const rateBooking = async (data, token, bookingId) => {
	try {
		await rateAccommodation(data, token, bookingId);
		return {
			type: constants.RATE_BOOKING_SUCCESS,
			payload: { ...data, bookingId },
		};
	} catch (err) {
		return {
			type: constants.RATE_BOOKING_ERROR,
			error: err.response.data,
		};
	}
};

export default Booking;
