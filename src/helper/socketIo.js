import socketClient from 'socket.io-client';
import { url } from '../Api/config';
import store from '../Redux/store';
import constant from '../Redux/constants';
import { toast } from 'react-toastify';

export const initializeSocketIo = token => {
	const socket = socketClient(url, { query: { token } });
	socket.on('new_message', data => {
		console.log(data);
	});
	socket.on('new_request', data => {
		console.log(data);
		const t = toast.success('You have a new notification');
		console.log(t);
		store.dispatch({
			type: constant.NEW_NOTIFCATION,
			notification: data,
		});
	});
};
