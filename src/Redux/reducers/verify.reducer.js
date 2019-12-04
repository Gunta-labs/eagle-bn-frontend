import constants from '../constants';

const initialState = {
	pending: false,
	verifyResult: null,
	error: null,
};

const VerifyReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.VERIFY_PENDING:
			return Object.assign({}, state, {
				pending: true,
				verifyResult: null,
				error: null,
			});
		case constants.VERIFY_SUCCESS:
			return Object.assign({}, state, {
				pending: false,
				verifyResult: action.verifyResult,
				error: null,
			});
		case constants.VERIFY_ERROR:
			return Object.assign({}, state, {
				pending: false,
				verifyResult: null,
				error: action.error,
			});
		default:
			return state;
	}
};

export default VerifyReducer;
