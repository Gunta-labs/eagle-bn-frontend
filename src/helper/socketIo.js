import React from 'react';
import socketClient from 'socket.io-client';
import { url } from '../Api/config';
import store from '../Redux/store';
import constant from '../Redux/constants';
import { toast } from 'react-toastify';
import user from './helper';

export const initializeSocketIo = token => {
	const socket = socketClient(url, { query: { token } });
	socket.on('new_request', data => {
		toast.success('You have a new notification');
		store.dispatch({
			type: constant.NEW_NOTIFCATION,
			notification: data,
		});
	});
	socket.on('new_message', data => {
		const Msg = ({ closeToast }) => (
			<div
				className='alert alert-dismissible'
				onClick={e => {
					e.preventDefault();
					store.dispatch({
						type: constant.CHAT_ACTIVE,
						payload: data.receiverId ? data.authorId : -1,
					});
				}}
			>
				<strong className='text-primary font-weight-bolder'> {data.authorName} </strong>
				<br />
				{data.message.slice(0, 20)}
				<button type='button' className='close'>
					<span> {closeToast} </span>
				</button>
			</div>
		);
		if (data.authorId !== user().userId) {
			toast(<Msg />);
		}
		store.dispatch({ type: constant.CHAT_NEW_MESSAGE });
	});
};
