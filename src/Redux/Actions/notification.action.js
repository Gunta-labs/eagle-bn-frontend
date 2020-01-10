import constants from '../constants';
import apis from '../../Api/notification.api';
import { toast } from 'react-toastify';

export const getNotifications = async token => {
	try {
		const result = await apis.getNotifications(token);
		result.data.data = (result.data.data || []).sort((a, b) => {
			return b.id - a.id;
		});
		return {
			type: constants.NOTIFICATION_SUCCESS,
			payload: result.data.data,
		};
	} catch (err) {
		return {
			type: constants.NOTIFICATION_ERROR,
			error: err.response ? err.response.data : err.message,
		};
	}
};
export const markAsRead = async (token, notificationId, link) => {
	try {
		const result = await apis.markNotificationAsRead(notificationId, token);
		result.id = notificationId;
		window.location = link;
		return {
			type: constants.MARK_NOTIFICATION_SUCCESS,
			payload: result,
		};
	} catch (err) {
		const error = err.response
			? err.response.data
			: 'An error occured when executing this action. Make sure you are connected to a valid network';
		toast.error(error);
		return {
			type: constants.MARK_NOTIFICATION_ERROR,
		};
	}
};

export const markAllAsRead = async token => {
	try {
		const result = await apis.markAllNotificationAsRead(token);
		return {
			type: constants.MARK_NOTIFICATION_SUCCESS_ALL,
			payload: result,
		};
	} catch (err) {
		const error = err.response
			? err.response.data
			: 'An error occured when executing this action. Make sure you are connected to a valid network';
		toast.error(error);
		return {
			type: constants.MARK_NOTIFICATION_ERROR_ALL,
		};
	}
};
