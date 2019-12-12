import constants from '../constants';

const initialState = {
	tripRequestStatus: 'not_started',
	message: 'Create Request',
	messageClass: 'text-primary font-weight-bolder',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case constants.TRIP_REQUESTER_SUCCEED:
			return {
				tripRequestStatus: 'success',
				message:
					'Your trip request was initiated successfully, wait for your manager to approve it!',
				messageClass: 'alert alert-success',
			};
		case constants.TRIP_REQUESTER_PENDING:
			return {
				tripRequestStatus: 'pending',
				message: undefined,
				messageClass: 'spinner-border text-primary',
			};
		case constants.TRIP_REQUESTER_FAILED:
			return {
				tripRequestStatus: 'failed',
				message: action.payload,
				messageClass: 'alert alert-warning',
			};
		case constants.TRIP_REQUESTER_ERROR:
			return {
				tripRequestStatus: 'error',
				message: 'Something went wrong! please try again later.',
				messageClass: 'alert alert-danger',
			};
		default:
			return state;
	}
};
