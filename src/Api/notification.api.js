import BASE_URL from './config';
import axios from 'axios';

const NotificationApi = {
	getNotifications(token) {
		return axios.get(`${BASE_URL}notifications/`, {
			headers: {
				Authorization: token,
			},
		});
	},
	markNotificationAsRead(notificationId, token) {
		return axios.patch(`${BASE_URL}notifications/${notificationId}/status`, null, {
			headers: {
				Authorization: token,
			},
		});
	},
	markAllNotificationAsRead(token) {
		return axios.patch(`${BASE_URL}notifications/readAll`, null, {
			headers: {
				Authorization: token,
			},
		});
	},
};

export default NotificationApi;
