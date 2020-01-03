import constants from '../constants';

const initialState = {
	pending: true,
	reply: null,
	error: null,
};

const initialState3 = {
	trash: null,
	error: null,
	pending: false,
};

const initialState4 = {
	edited: null,
	error: null,
	pending: false,
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

export const trashComment = (state = initialState3, { type, payload }) => {
	switch (type) {
		case constants.TRASH_REQUEST_COMMENT_SUCCESS:
			return {
				...state,
				trash: true,
				error: null,
				pending: false,
			};
		case constants.TRASH_REQUEST_COMMENT_ERROR:
			return {
				...state,
				trash: null,
				error: payload,
				pending: false,
			};
		case constants.TRASH_REQUEST_COMMENT_PENDING:
			return {
				...state,
				trash: null,
				error: null,
				pending: true,
			};
		default:
			return {
				trash: null,
				error: null,
				pending: false,
			};
	}
};

export const editComment = (state = initialState4, { type, payload }) => {
	switch (type) {
		case constants.EDIT_REQUEST_COMMENT_SUCCESS:
			return {
				...state,
				edited: true,
				error: null,
				pending: false,
			};
		case constants.EDIT_REQUEST_COMMENT_ERROR:
			return {
				...state,
				edited: null,
				error: payload,
				pending: false,
			};
		case constants.EDIT_REQUEST_COMMENT_PENDING:
			return {
				...state,
				edited: null,
				error: null,
				pending: true,
			};
		default:
			return {
				edited: null,
				error: null,
				pending: false,
			};
	}
};
