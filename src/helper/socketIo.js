import React from 'react';
import socketClient from 'socket.io-client';
import { url } from '../Api/config';
import store from '../Redux/store';
import constant from '../Redux/constants';
import { toast } from 'react-toastify';
import user from './helper';
import mentions from './mention.helper';

const splitId = link => {
	let ids = link.split(',');
	return `/requests/${parseInt(ids[0])}#${parseInt(ids[1])}`;
};

export const initializeSocketIo = token => {
	const socket = socketClient(url, { query: { token } });
	socket.on('new_request', data => {
		toast.success(data.description);
		store.dispatch({
			type: constant.NEW_NOTIFCATION,
			notification: data,
		});
	});
	socket.on('request_approved', data => {
		toast.success(data.description);
		store.dispatch({
			type: constant.NEW_NOTIFCATION,
			notification: data,
		});
	});
	socket.on('request_rejected', data => {
		toast.error(data.description);
		store.dispatch({
			type: constant.NEW_NOTIFCATION,
			notification: data,
		});
	});
	socket.on('new_message', payload => {
		const data = Object.entries(payload)[0][1][0];
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
				<strong className='text-primary font-weight-bolder'> {data.author.fullname} </strong>
				<br />
				{data.message.slice(0, 20)}
				<button type='button' className='close'>
					<span> {closeToast} </span>
				</button>
			</div>
		);
		if (user().userId !== data.authorId) {
			store.dispatch({ type: constant.CHAT_NEW_MESSAGE, payload });
			if (mentions(user(), data)) {
				toast(Msg);
			}
		}
	});
	socket.on('new_comment', data => {
		const Msg = ({ closeToast }) => (
			<div
				className='alert alert-dismissible'
				onClick={e => (window.location = splitId(data.modelId))}
			>
				{'New comment from ' + data.description}
				<button type='button' className='close'>
					<span> {closeToast} </span>
				</button>
			</div>
		);
		toast(Msg);
		store.dispatch({
			type: constant.NEW_NOTIFCATION,
			notification: data,
		});
		store.dispatch({ type: constant.NEW_COMMENT, payload: data.data });
	});
};
