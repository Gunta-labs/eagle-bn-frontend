import React from 'react';
import {
	faComment,
	faUserAlt,
	faSearch,
	faUsers,
	faHotel,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mapDispatchToProps from '../../Redux/Actions/chat.action';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import UserModel from './chat.model';
import { faAngleDoubleLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import userData from '../../helper/helper';

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accommodation: false,
		};
		this.showModel = this.showModel.bind(this);
		this.search = this.search.bind(this);
		this.showUser = this.showUser.bind(this);
		this.showMessage = this.showMessage.bind(this);
		this.chattedUsers = this.chattedUsers.bind(this);
		this.noChattedUsers = this.noChattedUsers.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	async handleSubmit(event) {
		event.preventDefault();
		const { accommodation } = this.state;
		const { sendMessage, activeChat } = this.props;
		const message = document.getElementsByClassName('input-message')[0].value;
		const AccommodationId =
			this.props.accommodation && accommodation
				? window.location.pathname.replace('/accommodations/', '')
				: null;
		if (message) {
			return await sendMessage({
				message,
				receiverId: activeChat === -1 ? null : activeChat,
				AccommodationId,
			});
		}
		toast.error('message is required');
	}
	chattedUsers() {
		const { chats, users } = this.props;
		return users.filter(
			e =>
				Object.keys(chats)
					.map(e => e.replace(/\d*,*/, ''))
					.indexOf(e.fullname) !== -1,
		);
	}
	noChattedUsers() {
		const { chats, users } = this.props;
		return users.filter(
			e =>
				Object.keys(chats)
					.map(e => e.replace(/\d*,*/, ''))
					.indexOf(e.fullname) === -1,
		);
	}
	async getUsers() {
		const { getAllUsers, users } = this.props;
		if (users.length === 0) {
			await getAllUsers();
		}
	}
	async getChats() {
		const { getAllChats, getMessage } = this.props;
		if (getMessage) {
			await getAllChats();
		}
	}
	showModel(e) {
		const { showChatModel, toggleShowChatModel } = this.props;
		e.preventDefault();
		toggleShowChatModel(showChatModel === 0 ? 1 : 0);
	}
	showMessage(e) {
		const { toggleShowChatModel, showChatModel } = this.props;
		e.preventDefault();
		toggleShowChatModel(showChatModel !== 1 ? 1 : 2);
	}
	renderUsers(users) {
		const { setActive, search } = this.props;
		return users
			.filter(
				element =>
					element.id !== userData().userId &&
					(element.id === parseInt(search) ||
						(element.fullname || element.email).toLowerCase().indexOf(search.toLowerCase()) !== -1),
			)
			.map(user => (
				<div
					className='user-model chat-table border-bottom'
					onClick={e => setActive(user.id)}
					key={user.id}
					id={user.id.toString()}
					style={user.id === -1 ? { backgroundColor: '#D0D3D4' } : {}}
				>
					<table style={{ width: '100%' }}>
						<thead>
							<tr>
								<td style={{ width: '20%' }}>
									{user.avatar ? (
										<img className='avatar-sm m-2' src={user.avatar} alt='avatar' />
									) : (
										<FontAwesomeIcon
											icon={user.id === -1 ? faUsers : faUserAlt}
											className='font-avatar text-primary m-2'
										/>
									)}
								</td>
								<td>
									<div className='m-2'>
										<span>{user.fullname || user.email}</span>
									</div>
								</td>
							</tr>
						</thead>
					</table>
				</div>
			));
	}
	showUser(user) {
		const { accommodation } = this.state;
		return (
			<table>
				<thead>
					<tr>
						<td>
							<button className='btn btn-primary m-2' onClick={this.showMessage} title='users'>
								<FontAwesomeIcon icon={faAngleDoubleLeft} />
							</button>
						</td>
						<td>
							{user.avatar ? (
								<img className='avatar-sm ml-2' src={user.avatar} alt='avatar' />
							) : (
								<FontAwesomeIcon
									icon={user.id === -1 ? faUsers : faUserAlt}
									className='font-avatar text-primary ml-2'
								/>
							)}
						</td>
						<td>
							<div className='m-2'>
								<span>{user.fullname}</span>
								<small className='text-secondary'> {user.email || 'all@barefoot.com'} </small>
							</div>
						</td>
						{this.props.accommodation && (
							<td>
								<FontAwesomeIcon
									icon={faHotel}
									className={`${accommodation ? 'text-primary' : 'text-secondary'} chat-acc`}
									title='enable/disable accommodation chat'
									onClick={e => {
										e.preventDefault();
										this.setState({ accommodation: !accommodation });
									}}
								/>
							</td>
						)}
					</tr>
				</thead>
			</table>
		);
	}
	search(e) {
		const { searchChange } = this.props;
		searchChange(e.target.value.trim());
	}
	render() {
		this.getUsers();
		this.getChats();
		const {
			showChatModel,
			chats,
			activeChat,
			user,
			error,
			setError,
			sendChatStatus,
			users,
		} = this.props;
		if (error !== '') {
			toast.error(error);
			setError('');
		}
		return (
			<div>
				{showChatModel === 1 && (
					<div className='chat-model-all-u bg-white rounded-lg shadow-lg'>
						<div className='p-3'>
							<div className='d-block p-2 border-bottom'>
								<span className='text-primary font-weight-bold'> Chat: </span>
								<div className='input-group'>
									<input
										type='text'
										className='form-control border-0'
										placeholder='search users'
										onChange={this.search}
									/>
									<div className='input-group-append'>
										<span className='input-group-text bg-white border-0'>
											<FontAwesomeIcon icon={faSearch} className='text-secondary' />
										</span>
									</div>
								</div>
							</div>
							<div className='chat-model-m'>
								{this.renderUsers(this.chattedUsers())}
								{this.renderUsers(this.noChattedUsers())}
							</div>
						</div>
					</div>
				)}
				{showChatModel === 2 && (
					<div className='bg-white rounded-lg shadow-lg chat-model-all'>
						<div
							className='chat-model-user border-bottom'
							style={user.id === -1 ? { backgroundColor: '#D0D3D4' } : {}}
						>
							{this.showUser(user)}
						</div>
						<UserModel
							chats={chats}
							activeChat={activeChat}
							user={user}
							showUser={this.showUser}
							showMessage={this.showMessage}
							sendChatStatus={sendChatStatus}
							users={users}
						/>
						<div className='chat-model-input p-3 border-top'>
							<div className='input-group'>
								<input
									className='form-control input-message'
									onKeyUp={e => {
										if (e.keyCode === 13) {
											this.handleSubmit(e);
										}
									}}
								/>
								<div className='input-group-append'>
									<span className='input-group-text' onClick={this.handleSubmit} title='send'>
										<FontAwesomeIcon icon={faPaperPlane} className='text-primary rotate' />
									</span>
								</div>
							</div>
						</div>
					</div>
				)}
				<div className='chat-icon bg-primary rounded-circle' onClick={this.showModel} title='chat'>
					<center>
						<FontAwesomeIcon icon={faComment} className='text-white' />
					</center>
				</div>
			</div>
		);
	}
}

Chat.propTypes = {
	users: PropTypes.array,
	activeChat: PropTypes.number,
	sendChatStatus: PropTypes.string,
	chats: PropTypes.object,
	error: PropTypes.string,
	showChatModel: PropTypes.number,
	search: PropTypes.string,
	getMessage: PropTypes.bool,
	user: PropTypes.object,
	accommodation: PropTypes.bool,
};

const mapStateToProps = ({ ChatReducer, SingleAccomodations }) => ({
	users: ChatReducer.users,
	activeChat: ChatReducer.activeChat,
	sendChatStatus: ChatReducer.sendChatStatus,
	showChatModel: ChatReducer.showChatModel,
	chats: ChatReducer.chats,
	error: ChatReducer.error,
	search: ChatReducer.search,
	getMessage: ChatReducer.getMessage,
	user: ChatReducer.user,
	newMessage: ChatReducer.newMessage,
	accommodation: SingleAccomodations.accommodation,
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
