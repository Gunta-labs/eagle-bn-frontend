import Apis from '../../Api';
import constants from '../constants';
import { token } from '../../helper/helper';

export default dispatch => ({
	getAllUsers: async () => {
		try {
			const res = await Apis.getAllUsers();
			return dispatch({ type: constants.CHAT_GET_USERS_SUCESS, payload: res.data.data });
		} catch (err) {
			return dispatch({
				type: constants.CHAT_ERROR,
				payload: err.message,
			});
		}
	},
	getAllChats: async () => {
		try {
			const res = await Apis.getChats(token);
			return dispatch({ type: constants.CHAT_CHATS_SUCESS, payload: res.data.data });
		} catch (err) {
			const { response } = err;
			if (response && response.status === 401) {
				return dispatch({
					type: constants.CHAT_ERROR,
					payload: 'Your session has expired, login again',
				});
			}
			return dispatch({
				type: constants.CHAT_ERROR,
				payload: err.message,
			});
		}
	},
	toggleShowChatModel: payload => dispatch({ type: constants.CHAT_SHOW_MODEL, payload }),
	toggleShowChatMessage: payload => dispatch({ type: constants.CHAT_CHATS_MODEL, payload }),
	searchChange: payload => dispatch({ type: constants.CHAT_SEARCH, payload }),
	setActive: payload => dispatch({ type: constants.CHAT_ACTIVE, payload }),
	setError: payload => dispatch({ type: constants.CHAT_ERROR, payload }),
	sendMessage: async payload => {
		try {
			dispatch({ type: constants.CHAT_SEND_PENDING });
			await Apis.postChat(payload, token);
			document.getElementsByClassName('input-message')[0].value = '';
			return dispatch({ type: constants.CHAT_SEND_SUCESS });
		} catch (err) {
			const { response } = err;
			if (response) {
				return dispatch({
					type: constants.CHAT_ERROR,
					payload: response.data.msg,
				});
			}
			return dispatch({
				type: constants.CHAT_ERROR,
				payload: err.message,
			});
		}
	},
});
