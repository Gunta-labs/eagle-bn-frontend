import React from 'react';
import socketClient from 'socket.io-client';
import { url } from '../Api/config';
import store from '../Redux/store';
import constant from '../Redux/constants';
import { toast } from 'react-toastify';
import user from './helper';
import { Redirect } from 'react-router-dom';

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
	socket.on('new_comment', data => {
		const Msg = ({ closeToast }) => (
			<div
				className='alert alert-dismissible'
				onClick={e => (window.location = `/requests/${data.modelId}`)}
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
