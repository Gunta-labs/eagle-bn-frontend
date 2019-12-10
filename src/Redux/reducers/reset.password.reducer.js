import constants from '../constants';

const initialState = {
	requestResetStatus: 'not_started',
	resetPasswordStatus: 'not_started',
};

export default (state = initialState, action) => {
	const { type } = action;
	switch (type) {
		case constants.RESET_PASSWORD_SUCCESS:
			return { ...state, resetPasswordStatus: 'success' };
		case constants.RESET_PASSWORD_FAILED:
			return { ...state, resetPasswordStatus: 'failed' };
		case constants.RESET_PASSWORD_ERROR:
			return { ...state, resetPasswordStatus: 'error' };
		case constants.RESET_PASSWORD_UNMATCH:
			return { ...state, resetPasswordStatus: 'unmatch' };
		case constants.REQUEST_RESET_SUCCESS:
			return { ...state, requestResetStatus: 'success' };
		case constants.REQUEST_RESET_FAILED:
			return { ...state, requestResetStatus: 'failed' };
		case constants.REQUEST_RESET_ERROR:
			return { ...state, requestResetStatus: 'error' };
		case constants.REQUEST_RESET_PASSWORD_PENDING:
			return { ...state, requestResetStatus: 'pending' };
		case constants.RESET_PASSWORD_PENDING:
			return { ...state, resetPasswordStatus: 'pending' };
		default:
			return state;
	}
};
