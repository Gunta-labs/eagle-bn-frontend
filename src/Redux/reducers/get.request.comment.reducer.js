import constants from '../constants';

const initialState = {
	pending: true,
	comments: null,
	error: null,
};

const getComment = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case constants.GET_REQUEST_COMMENT_SUCCESS:
			return {
				...state,
				pending: false,
				comments: payload,
				error: null,
			};
		case constants.GET_REQUEST_COMMENT_ERROR:
			return {
				...state,
				pending: false,
				comments: null,
				error: payload,
			};
		case constants.GET_REQUEST_COMMENT_PENDING:
			return {
				...state,
				pending: true,
				comments: null,
				error: null,
			};

		default:
			return state;
	}
};

export default getComment;
