import constants from '../constants';
import apis from '../../Api';

export const getNotifications = async token => {
	try {
		const result = await apis.getNotifications(token);
		return {
			type: constants.NOTIFICATION_SUCCESS,
			payload: result.data.data.reverse(),
		};
	} catch (err) {
		return {
			type: constants.NOTIFICATION_ERROR,
			error: err.response.data,
		};
	}
};
export const markAsRead = async (token, notificationId) => {
	try {
		const result = await apis.markNotificationAsRead(notificationId, token);
		result.id = notificationId;
		return {
			type: constants.MARK_NOTIFICATION_SUCCESS,
			payload: result,
		};
	} catch (err) {
		return {
			type: constants.MARK_NOTIFICATION_ERROR,
			error: err.response.data,
		};
	}
};

export const markAllAsRead = async token => {
	try {
		const result = await apis.markAllNotificationAsRead(token);
		return {
			type: constants.GETREQUEST_SUCCESS,
			payload: result,
		};
	} catch (err) {
		return {
			type: constants.GETREQUEST_ERROR,
			error: err.response.data,
		};
	}
};
