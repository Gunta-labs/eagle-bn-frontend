import constants from '../constants';

const initialState = {
	pending: true,
	comments: null,
	error: null,
};

const addComment = (comments, data) => {
	if (data.parent) {
		return comments.map(comment => {
			if (comment.id === data.parent) {
				return { ...comment, replies: [...comment.replies, data] };
			}
			return comment;
		});
	} else {
		data.replies = [];
		return [data, ...comments];
	}
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
		case constants.NEW_COMMENT:
			return {
				...state,
				pending: false,
				comments: addComment(state.comments, payload),
				error: null,
			};
		default:
			return state;
	}
};

export default getComment;
