import React from 'react';
import { faCheckDouble, faCheck, faClipboard, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	getNotifications,
	markAllAsRead,
	markAsRead,
} from '../../Redux/Actions/notification.action';
import { connect } from 'react-redux';
import { token } from '../../helper/helper';
import dateHelper from '../../helper/date.helper';
import ReactTooltip from 'react-tooltip';

export class Notification extends React.Component {
	componentDidMount() {
		this.props.getAll(token);
	}
	getTitle(type) {
		switch (type) {
			case 'new_request':
				return { title: 'New request created', icon: faClipboard };
			case 'request_approved':
				return { title: 'Request approved', icon: faClipboard };
			case 'request_rejected':
				return { title: 'Request rejected', icon: faClipboard };
			case 'new_comment':
				return { title: 'New comment', icon: faComment };
			default:
				return 'New notification';
		}
	}
	SetAsRead(notificationId, link, isread) {
		if (!isread) {
			this.props.markOne(token, notificationId, link);
		} else {
			window.location = link;
		}
	}
	SetAllAsRead() {
		this.props.markAll(token);
	}
	getNotificationsDetail(data) {
		if (data) {
			return data.map((notification, i) => {
				return (
					<div style={{ cursor: 'pointer' }}>
						<ReactTooltip place='top' type='dark' effect='float' id='markOne'>
							<span>Mark as read</span>
						</ReactTooltip>
						<ReactTooltip place='top' type='dark' effect='float' id='markAll'>
							<span>Mark all as read</span>
						</ReactTooltip>
						<div
							className={`pl-2 border-bottom ${!notification.isRead ? 'bg-active' : ''}`}
							onClick={e =>
								this.SetAsRead(
									notification.id,
									`/requests/${notification.modelId}`,
									notification.isRead,
									e,
								)
							}
						>
							<div className='d-flex justify-content-between pt-2 pl-2 pr-2'>
								<h6 className='text-dark '>
									<span className='text-black-50 mr-2'>
										<FontAwesomeIcon icon={this.getTitle(notification.type).icon} size='sm' />
									</span>
									{this.getTitle(notification.type).title}
								</h6>
								<span
									id='singleNot'
									className={`${
										notification.isRead ? 'text-black-50' : 'text-primary'
									} markOneAsRead`}
									data-tip
									data-for={`${notification.isRead ? '' : 'markOne'}`}
								>
									<FontAwesomeIcon icon={faCheck} size='sm' />
								</span>
							</div>
							<div className='d-flex justify-content-between pt-1 pl-2 pr-1 '>
								<label
									className='text-secondary  mr-2 pr-1'
									style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
								>
									{notification.description || notification.type}
								</label>
								<label
									className='text-black-50'
									style={{ fontSize: 10 + 'px', width: 120 + 'px', textAlign: 'right' }}
								>
									{dateHelper(new Date(notification.createdAt))}
								</label>
							</div>
						</div>
					</div>
				);
			});
		}
		return '';
	}
	render() {
		const { payload, visibility } = this.props;
		return (
			<div>
				<div className={`blurPanel ${visibility}`} onClick={this.props.closeNotification}></div>
				<div className={`notificationPanel shadow-sm ${visibility}`}>
					<div className='d-flex justify-content-between pt-3 pl-3 pr-2 pb-2 shadow-sm'>
						<h5 className='text-primary'>Notifications</h5>
						<span
							className='text-primary markAllAsRead shadow-sm'
							id='markAll'
							data-tip
							data-for='markAll'
							title='Tooltip on bottom'
							onClick={e => this.SetAllAsRead(e)}
						>
							<FontAwesomeIcon icon={faCheckDouble} size='sm' />
						</span>
					</div>
					<div className='pl-0 border-bottom'>{this.getNotificationsDetail(payload)}</div>
				</div>
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
		getAll: async token => dispatch(await getNotifications(token)),
		markOne: async (token, notificationId, link) =>
			dispatch(await markAsRead(token, notificationId, link)),
		markAll: async token => dispatch(await markAllAsRead(token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
