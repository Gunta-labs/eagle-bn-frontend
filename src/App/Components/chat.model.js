import React from 'react';
import { Link } from 'react-router-dom';
import userData from '../../helper/helper';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class ChatModel extends React.Component {
	componentDidUpdate() {
		const messages = document.getElementsByClassName('chat-model-m')[0];
		messages.scrollTop = messages.scrollHeight;
	}
	componentDidMount() {
		const messages = document.getElementsByClassName('chat-model-m')[0];
		messages.scrollTop = messages.scrollHeight;
	}
	render() {
		const { chats, user, activeChat, sendChatStatus, users } = this.props;
		let chat, user_;
		if (activeChat === -1) {
			chat = chats['public'];
		} else {
			const { fullname, id } = user;
			chat = chats[`${id},${fullname}`];
		}
		const { userId } = userData();
		return (
			<div className='chat-model-m'>
				<div className='p-3'>
					{(chat || [])
						.sort((a, b) => (a.id > b.id ? 1 : -1))
						.map(e => (
							<div className={e.authorId === userId ? 'author' : 'reciever'} key={e.id}>
								{e.message}
								<small className='d-block mt-3'>
									{user.id === -1 && e.authorId !== userId ? (
										<span>
											{(user_ = users.find(ex => ex.id === e.authorId)).avatar && (
												<img
													style={{ maxWidth: '20px' }}
													className='round mr-2'
													src={user_.avatar}
													alt='avatar'
												/>
											)}
											{`${e.author.fullname}  `}
										</span>
									) : (
										''
									)}
									{timeAgo.format(new Date(e.createdAt), 'ago')}
								</small>
								<div>
									{e.accommodation && (
										<Link
											to={`/accommodations/${e.accommodation.id}`}
											className='btn btn-success text-white'
										>
											{e.accommodation.name}
										</Link>
									)}
								</div>
							</div>
						))}
					{sendChatStatus === 'pending' && (
						<div className='author'>
							<div className='spinner-border text-primary my-3 ml-5'> </div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default ChatModel;
