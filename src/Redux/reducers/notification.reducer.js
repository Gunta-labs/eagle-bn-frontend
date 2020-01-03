import constants from '../constants';

const initialState = {
	pending: false,
	payload: [],
	error: null,
	markSuccess: null,
	markError: null,
};

const updateNotification = (data, action) => {
	return data.map((item, index) => {
		if (item.id !== action.payload.id) {
			return item;
		}
		return {
			...item,
			isRead: !item.isRead,
		};
	});
};
const updateNotificationAll = data => {
	return data.map(item => {
		return {
			...item,
			isRead: true,
		};
	});
};

const NotificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.NOTIFICATION_PENDING:
			return Object.assign({}, state, {
				pending: true,
				payload: null,
				error: null,
			});
		case constants.NOTIFICATION_SUCCESS:
			return Object.assign({}, state, {
				pending: false,
				payload: action.payload,
				error: null,
			});
		case constants.NOTIFICATION_ERROR:
			return Object.assign({}, state, {
				pending: false,
				payload: null,
				error: action.error,
			});
		case constants.MARK_NOTIFICATION_SUCCESS:
			return Object.assign({}, state, {
				markSuccess: action.payload,
				markError: null,
				payload: updateNotification(state.payload, action),
			});
		case constants.MARK_NOTIFICATION_SUCCESS_ALL:
			return Object.assign({}, state, {
				markSuccess: action.payload,
				markError: null,
				payload: updateNotificationAll(state.payload),
			});
		case constants.MARK_NOTIFICATION_ERROR:
			return Object.assign({}, state, {
				markSuccess: null,
				markError: action.error,
			});
		case constants.NEW_NOTIFCATION:
			return Object.assign({}, state, {
				payload: [action.notification, ...state.payload],
			});
		default:
			return state;
	}
};

export default NotificationReducer;
