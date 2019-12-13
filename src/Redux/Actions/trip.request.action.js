import constants from '../constants';
import sendTripRequest from '../../Api/trip.request.api';

export default data => async dispatch => {
	try {
		dispatch({ type: constants.TRIP_REQUESTER_PENDING, payload: {} });
		const res = await sendTripRequest(data);
		if (res.status === 201) {
			dispatch({ type: constants.TRIP_REQUESTER_SUCCEED, payload: res.data.msg });
		}
	} catch (error) {
		const { response } = error;
		if (response && (response.status === 400 || response.status === 401)) {
			const msg = response.data.msg.timeZone
				? `Invalid time zone, try one of these: ${JSON.parse(response.data.msg.timeZone)[1]
						.slice(0, 9)
						.join(', ')}`
				: response.data.msg;
			dispatch({
				type: constants.TRIP_REQUESTER_FAILED,
				payload: msg,
			});
		} else {
			dispatch({ type: constants.TRIP_REQUESTER_ERROR, payload: {} });
		}
	}
};
