import constants from '../constants';

const initialState = {
	pending: true,
	reply: null,
	error: null,
};

export const replyComment = (state = initialState, { type, payload }) => {
	switch (type) {
		case constants.SEND_REQUEST_COMMENT_REPLY_SUCCESS:
			return {
				...state,
				reply: 'Comment reply saved',
				error: null,
				pending: false,
			};
		case constants.SEND_REQUEST_COMMENT_REPLY_ERROR:
			return {
				...state,
				reply: null,
				error: payload,
				pending: false,
			};
		case constants.SEND_REQUEST_COMMENT_REPLY_PENDING:
			return {
				...state,
				reply: null,
				error: payload,
				pending: false,
			};
		default:
			return state;
	}
};

export const sendComment = (state = initialState, { type, payload }) => {
	switch (type) {
		case constants.SEND_REQUEST_COMMENT_SUCCESS:
			return {
				...state,
				send: true,
				error: null,
				pending: false,
			};
		case constants.SEND_REQUEST_COMMENT_ERROR:
			return {
				...state,
				send: null,
				error: payload,
				pending: false,
			};
		case constants.SEND_REQUEST_COMMENT_PENDING:
			return {
				...state,
				reply: null,
				error: payload,
				pending: true,
			};
		default:
			return {
				send: null,
				error: null,
				pending: true,
			};
	}
};
