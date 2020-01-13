import constants from '../constants';

const initialState = {
	users: [],
	activeChat: -1,
	sendChatStatus: 'not_started',
	showChatModel: 0,
	chats: {},
	error: '',
	search: '',
	getMessage: true,
	user: {},
	reRender: false,
};

const chats = (all, payload) => {
	const key = Object.keys(payload)[0];
	if (Array.isArray(all[key])) {
		all[key].push(payload[key][0]);
		return all;
	}
	all[key] = payload[key];
	return all;
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case constants.CHAT_GET_USERS_SUCESS:
			return {
				...state,
				users: [{ fullname: 'public', id: -1, isverified: true }, ...payload],
				error: '',
			};
		case constants.CHAT_SHOW_MODEL:
			return { ...state, showChatModel: payload };
		case constants.CHAT_ERROR:
			return { ...state, error: payload, sendChatStatus: 'not_started' };
		case constants.CHAT_CHATS_SUCESS:
			return { ...state, chats: payload, getMessage: false, sendChatStatus: 'not_started' };
		case constants.CHAT_SEARCH:
			return { ...state, search: payload };
		case constants.CHAT_ACTIVE:
			return {
				...state,
				user: state.users.find(e => e.id === payload),
				activeChat: payload,
				showChatModel: 2,
				error: '',
				search: '',
			};
		case constants.CHAT_NEW_MESSAGE:
			return { ...state, chats: chats(state.chats, payload), reRender: !state.reRender };
		case constants.CHAT_SEND_SUCESS:
			return {
				...state,
				chats: chats(state.chats, payload),
				sendChatStatus: 'not_started',
				reRender: !state.reRender,
			};
		case constants.CHAT_SEND_PENDING:
			return { ...state, sendChatStatus: 'pending' };
		default:
			return state;
	}
};
