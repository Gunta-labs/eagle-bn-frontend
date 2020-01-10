import apis from '../../Api/index';
import constants from '../constants/index';

export const getComments = async requestId => {
	try {
		let token = localStorage.getItem('barefoot_token');
		let result = await apis.getRequestComment(requestId, token);
		const { data, status } = result.data;
		if (status === 404) {
			return {
				type: constants.GET_REQUEST_COMMENT_ERROR,
				payload: result.data.msg,
			};
		}
		return {
			type: constants.GET_REQUEST_COMMENT_SUCCESS,
			payload: data,
		};
	} catch (error) {
		let message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: constants.GET_REQUEST_COMMENT_ERROR,
			payload: message,
		};
	}
};

export const sendReply = async (requestId, payload) => {
	try {
		let token = localStorage.getItem('barefoot_token');
		let result = await apis.sendCommentReply(requestId, token, payload);
		const { data } = result.data;
		return {
			type: constants.SEND_REQUEST_COMMENT_REPLY_SUCCESS,
			payload: data,
		};
	} catch (error) {
		let message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: constants.SEND_REQUEST_COMMENT_REPLY_ERROR,
			payload: message,
		};
	}
};

export const sendComment = async (requestId, payload) => {
	try {
		let token = localStorage.getItem('barefoot_token');
		let result = await apis.sendCommentReply(requestId, token, payload);
		const { data } = result.data;
		return {
			type: constants.SEND_REQUEST_COMMENT_SUCCESS,
			payload: data,
		};
	} catch (error) {
		let message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: constants.SEND_REQUEST_COMMENT_ERROR,
			payload: message,
		};
	}
};

export const trashComment = async (requestId, commentId) => {
	try {
		let token = localStorage.getItem('barefoot_token');
		let result = await apis.trashComment(requestId, commentId, token);
		const { data } = result.data;
		return {
			type: constants.TRASH_REQUEST_COMMENT_SUCCESS,
			payload: data,
		};
	} catch (error) {
		let message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: constants.TRASH_REQUEST_COMMENT_ERROR,
			payload: message,
		};
	}
};

export const editComment = async (requestId, commentId, payload) => {
	try {
		let token = localStorage.getItem('barefoot_token');
		let result = await apis.editComment(requestId, commentId, payload, token);
		const { data } = result.data;
		return {
			type: constants.EDIT_REQUEST_COMMENT_SUCCESS,
			payload: data,
		};
	} catch (error) {
		let message = error.response ? error.response.data.msg : 'No internet access';
		return {
			type: constants.EDIT_REQUEST_COMMENT_ERROR,
			payload: message,
		};
	}
};
