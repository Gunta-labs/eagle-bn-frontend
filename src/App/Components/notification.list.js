import React from 'react';
import { faCheckDouble, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import constants from '../../Redux/constants';
import {
	getNotifications,
	markAllAsRead,
	markAsRead,
} from '../../Redux/Actions/notification.action';
import { connect } from 'react-redux';
import { token } from '../../helper/helper';

export class Logout extends React.Component {
	componentDidMount() {
		this.props.getAll(token);
	}
	getTitle(type) {
		switch (type) {
			case 'new_request':
				return 'New request created';
			case 'request_approved':
				return 'Request approved';
			case 'request_rejected':
				return 'Request rejected';
			case 'new_comment':
				return 'New comment';
			default:
				return 'New notification';
		}
	}
	SetAsRead(notificationId) {
		console.log('here');
		this.props.markOne(token, notificationId);
	}
	getNotificationsDetail(data) {
		if (data) {
			return data.map(notification => {
				return (
					<div className='pl-2 border-bottom'>
						<div className='d-flex justify-content-between pt-2 pl-2 pr-2'>
							<h6 className='text-dark '>{this.getTitle(notification.type)}</h6>
							<span
								className={`${
									!notification.isRead ? 'text-black-50' : 'text-primary'
								} markOneAsRead`}
								onClick={e => this.SetAsRead(notification.id, e)}
							>
								<FontAwesomeIcon icon={faCheck} size='sm' />
							</span>
						</div>
						<div className='d-flex justify-content-between pt-1 pl-2 pr-2 '>
							<label className='text-secondary '>Your request to kampala has been approved</label>
							<label className='text-black-50'>4d ago</label>
						</div>
					</div>
				);
			});
		}
	}
	render() {
		const { payload, visibility } = this.props;
		return (
			<div className={`notificationPanel shadow-sm ${visibility}`}>
				<div className='d-flex justify-content-between pt-3 pl-3 pr-2 pb-2 shadow-sm'>
					<h5 className='text-primary'>Notifications</h5>
					<span className='text-primary markAllAsRead shadow-sm'>
						<FontAwesomeIcon icon={faCheckDouble} size='sm' />
					</span>
				</div>
				<div className='pl-2 border-bottom'>{this.getNotificationsDetail(payload)}</div>
			</div>
		);
	}
}

export const mapStateToProps = state => ({
	payload: state.Notification.payload,
	pending: state.Notification.pending,
	error: state.Notification.error,
	markSuccess: state.Notification.markSuccess,
	markError: state.Notification.markError,
});
export const mapDispatchToProps = dispatch => {
	return {
		inits: () =>
			dispatch({
				type: constants.NOTIFICATION_PENDING,
				pending: true,
			}),
		getAll: async token => dispatch(await getNotifications(token)),
		markOne: async (token, notificationId) => dispatch(await markAsRead(token, notificationId)),
		markAll: async token => dispatch(await markAllAsRead(token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
