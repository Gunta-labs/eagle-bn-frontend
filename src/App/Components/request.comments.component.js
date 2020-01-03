/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash, faEdit, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
	sendReply,
	getComments,
	sendComment,
	trashComment,
	editComment,
} from '../../Redux/Actions/request.comments.action';
import constants from '../../Redux/constants/index';
import send from '../../Assets/images/send.png';
import DeleteComment from './delete.comment.component';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { toast } from 'react-toastify';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');
export class RequestComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			key: '',
			reply: '',
			comment: '',
			draftComment: '',
			model: false,
			editMode: false,
			commentId: null,
		};
	}
	UNSAFE_componentWillReceiveProps(prevProps) {
		const { trash_success, edited_success } = prevProps;
		if (trash_success) {
			this.setState({
				model: false,
			});
			this.retreiveComment();
		}

		if (edited_success) {
			this.setState({
				draftComment: '',
				commentId: '',
				editMode: false,
			});
			this.retreiveComment();
		}
	}

	handleInput = e => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	closeModal = e => {
		e.preventDefault();
		this.setState({ model: false });
	};
	openModal = e => {
		e.preventDefault();
		let { id } = e.target;
		this.setState({ key: id }, () => {
			this.setState({ model: true });
		});
	};
	handleHide = e => {
		const { id } = e.target;
		let reply = document.querySelectorAll('.replies');
		for (let i = 0; i < reply.length; i++) {
			if (id == reply[i].id.replace('reply-', '')) {
				if (reply[i].style.display === 'none') reply[i].style.display = 'block';
				else reply[i].style.display = 'none';
			} else {
				reply[i].style.display = 'none';
			}
		}
	};

	sendCommentReply = async e => {
		e.preventDefault();
		const data = {
			comment: this.state.reply,
			parent: e.target.id,
		};
		const { id } = this.props.props.match.params;
		await this.props.loading_reply_comment();
		await this.props.sendReply(id, data);
		if (this.props.reply_error) toast.error(this.props.reply_error);
		const { reply_success, reply_pending } = this.props;
		if (!reply_pending && reply_success) {
			this.setState({ reply: '' });
			this.retreiveComment();
		}
	};

	sendComment = async e => {
		e.preventDefault();
		const data = {
			comment: this.state.comment,
		};
		const { id } = this.props.props.match.params;
		await this.props.loading_sent_comment();
		await this.props.sendComment(id, data);
		if (this.props.send_error) toast.error(this.props.send_error);

		const { send_success, send_pending } = this.props;
		if (send_pending === false && send_success) {
			this.setState({ comment: '' });
			this.retreiveComment();
		}
	};

	componentDidMount() {
		this.retreiveComment();
	}

	editComment = async e => {
		e.preventDefault();
		let { editComment } = this.props;
		let { id } = this.props.props.match.params;
		let { draftComment, commentId } = this.state;

		let data = {
			comment: draftComment,
		};
		await editComment(id, commentId, data);
	};

	retreiveComment() {
		const { loading_comment, getComments } = this.props;
		const { id } = this.props.props.match.params;
		loading_comment();
		getComments(id);
	}

	editButton = e => {
		this.setState({
			draftComment: e.target.comment,
			commentId: e.target.id,
			editMode: true,
		});
	};

	closeEditButton = e => {
		if (this.state.editMode) {
			this.setState({
				draftComment: '',
				commentId: '',
				editMode: false,
			});
		}
	};

	replies = values => {
		return values.map((e, i) => {
			return (
				<React.Fragment key={i}>
					<div className='ml-3 border card rounded-0'>
						<p className='card-header font-weight-normal bg-white px-2 py-2 border-bottom'>
							<FontAwesomeIcon icon={faUser} /> {e['User.fullname']}{' '}
							{e['User.RoleId'] === 4 ? '(Line Manager)' : ''}
						</p>
						<div className='pl-2 card-body pb-0 pt-0' style={{ minHeight: '50px' }}>
							{this.state.editMode && e.id == this.state.commentId ? (
								<span className='h-auto'>
									<form
										className='comment-form2'
										onSubmit={e => {
											this.editComment(e);
										}}
									>
										<input
											row='4'
											name='draftComment'
											type='text'
											className={`border inp`}
											onChange={this.handleInput}
											placeholder='Reply this Comment'
											value={this.state.draftComment}
										/>
										<button type='submit' className='p-0 btn bg-white send-button2'>
											<img src={send} alt='send button' className='img2' />
										</button>
									</form>
								</span>
							) : (
								<>
									<p className='pl-2'>{e.comment}</p>
									<small className='float-right'>
										{timeAgo.format(new Date(e.createdAt), 'ago')}
									</small>
								</>
							)}
						</div>
						{this.props.props.userId === e.userId && (
							<span className='card-footer px-0 py-0 bg-white d-flex justify-content-between px-2 py-2 border-top'>
								{this.state.editMode && e.id == this.state.commentId ? (
									<FontAwesomeIcon
										icon={faTimes}
										className='text-danger float-left text-primary close-edit-btn'
										onClick={e => {
											this.closeEditButton(e);
										}}
									/>
								) : (
									<FontAwesomeIcon
										icon={faEdit}
										className='float-left text-primary'
										onClick={event => {
											event.target.id = e.id;
											event.target.comment = e.comment;
											this.editButton(event);
										}}
									/>
								)}
								<FontAwesomeIcon
									icon={faTrash}
									className='float-right text-danger open-modal2'
									onClick={event => {
										event.target = { id: e.id, comment: e.comment };
										this.openModal(event);
									}}
								/>
							</span>
						)}
					</div>
				</React.Fragment>
			);
		});
	};

	render() {
		const { id } = this.props.props.match.params;
		const {
			pending_comment,
			comment_error,
			comments,
			reply_error,
			send_error,
			trashComment,
			trash_pending,
			loading_trash_comment,
			edited_error,
		} = this.props;
		const { userId } = this.props.props;
		const display =
			!pending_comment &&
			!comment_error &&
			comments.map((e, i) => {
				return (
					<React.Fragment key={i}>
						<div className='col-12 shadow-sm border'>
							<div className='list-group list-group-flush'>
								<div className='list-group-item pb-0'>
									<p className='font-weight-normal'>
										<FontAwesomeIcon icon={faUser} /> {e['User.fullname']}{' '}
										{e['User.RoleId'] === 4 ? '(Line Manager)' : ''}
									</p>
									{this.state.editMode && e.id == this.state.commentId ? (
										<span className='mt-2'>
											<form className='comment-form' onSubmit={this.editComment}>
												<input
													style={{ marginTop: '15px' }}
													onChange={this.handleInput}
													name='draftComment'
													value={this.state.draftComment}
													type='text'
													className={edited_error ? `border border-danger inp` : ` border inp`}
													placeholder='Reply this Comment'
												/>
												<button type='submit' className='p-0 btn bg-white send-button2'>
													<img src={send} alt='send button' className='img2' />
												</button>
												<p className='text-danger'>{edited_error}</p>
											</form>
										</span>
									) : (
										<>
											<p>{e.comment}</p>
											<small className='float-right'>
												{timeAgo.format(new Date(e.createdAt), 'ago')}
											</small>
										</>
									)}
								</div>
								<div className='list-group-item text-center text-primary'>
									{userId === e.userId &&
										(this.state.editMode && e.id == this.state.commentId ? (
											<FontAwesomeIcon
												icon={faTimes}
												className=' text-danger float-left text-primary'
												onClick={() => {
													this.closeEditButton(e);
												}}
											/>
										) : (
											<FontAwesomeIcon
												icon={faEdit}
												className='float-left text-primary edit-btn2'
												onClick={event => {
													event.target.id = e.id;
													event.target.comment = e.comment;
													this.editButton(event);
												}}
											/>
										))}

									<span
										onClick={e => {
											e.target.id = i;
											this.handleHide(e);
										}}
										id='reply-btn'
									>
										<FontAwesomeIcon icon={faReply} className='text-primary' />{' '}
										<span className='badge badge-secondary font-weight-bold'>
											{e.replies.length}
										</span>
									</span>
									{this.props.props.userId === e.userId && (
										<span
											className='open-modal'
											onClick={event => {
												this.setState({ deletedId: e.id });
												event.target = { id: e.id, comment: e.comment };
												this.openModal(event);
											}}
										>
											{!trash_pending ? (
												<FontAwesomeIcon icon={faTrash} className='float-right text-danger' />
											) : e.id === this.state.deletedId ? (
												<span className='float-right text-danger spinner-border spinner-border-sm'></span>
											) : (
												<FontAwesomeIcon icon={faTrash} className='float-right text-danger' />
											)}
										</span>
									)}
								</div>
								<div
									className='list-group-item replies'
									id={`reply-${i}`}
									style={{ display: 'none' }}
								>
									<p className='font-weight-normal text-primary'>Reply</p>
									{e.replies.length ? this.replies(e.replies) : ''}
									<div className='ml-3'>
										<div className='pl-2 pt-0'>
											<p className='text-primary font-weight-normal'>Send your reply</p>
											<form
												className='comment-form'
												onSubmit={event => {
													event.target.id = e.id;
													event.preventDefault();
													this.sendCommentReply(event);
												}}
											>
												<div className='input-group'>
													<input
														name='reply'
														type='text'
														className={
															reply_error
																? ` form-control border border-danger inp`
																: ` form-control inp border`
														}
														onChange={this.handleInput}
														placeholder='Reply this Comment'
														value={this.state.reply}
													/>
													<div className='input-group-append'>
														<button type='submit' className='p-0 btn bg-white send-button2'>
															<img src={send} alt='send button' className='img2' />
														</button>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						<br />
					</React.Fragment>
				);
			});
		return (
			<React.Fragment>
				<div className='card overflow-hidden'>
					<div className='card-header bg-white'>Comment</div>
					<div className='card-body' style={{ height: '33rem', overflowY: 'scroll' }}>
						{pending_comment && (
							<div className='col text-center' style={{ marginTop: '40%' }}>
								<div className='spinner-border text-primary '> </div>
							</div>
						)}
						{!pending_comment && comment_error && (
							<div className='col text-center ml-auto mr-auto' style={{ marginTop: '20%' }}>
								<h2 className='text-secondary'>
									{' '}
									{'No Comment found, Be the first to add a comment'}{' '}
								</h2>
							</div>
						)}
						{display}
					</div>
					<div className='card-footer bg-white px-1 py-1 mt-auto'>
						<form
							id='submit-form'
							onSubmit={e => {
								this.sendComment(e);
							}}
						>
							<div className='input-group'>
								<input
									placeholder='Enter Your comment here'
									type='text'
									className={
										send_error
											? `form-control border border-danger mt-1 inp`
											: ` form-control border mt-1 inp`
									}
									onChange={this.handleInput}
									value={this.state.comment}
									name='comment'
									required
								/>
								<div className='input-group-append'>
									<button type='submit' className=' p-0 btn bg-white bg-success send-button2'>
										<img src={send} alt='send button' className='img2' />
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				{this.state.model && !this.state.model_comment && (
					<DeleteComment
						load={loading_trash_comment}
						id={id}
						commentId={this.state.key}
						trash={trashComment}
						close={this.closeModal}
					/>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ replyComment, getComment, sendComment, trashComment, editComment }) => ({
	reply_success: replyComment.reply,
	reply_error: replyComment.error,
	reply_pending: replyComment.pending,
	pending_comment: getComment.pending,
	comments: getComment.comments,
	comment_error: getComment.error,
	send_success: sendComment.send,
	send_error: sendComment.error,
	send_pending: sendComment.pending,
	trash_pending: trashComment.pending,
	trash_success: trashComment.trash,
	trash_error: trashComment.error,
	edited_success: editComment.edited,
	edited_pending: editComment.pending,
	edited_error: editComment.error,
});

export const mapDispatchToProp = dispatch => ({
	getComments: async requestId => dispatch(await getComments(requestId)),
	loading_comment: () =>
		dispatch({
			type: constants.GET_REQUEST_COMMENT_PENDING,
			payload: null,
		}),
	loading_reply_comment: () =>
		dispatch({
			type: constants.SEND_REQUEST_COMMENT_REPLY_PENDING,
			payload: '',
		}),
	loading_sent_comment: () =>
		dispatch({
			type: constants.SEND_REQUEST_COMMENT_PENDING,
			payload: '',
		}),
	loading_trash_comment: () =>
		dispatch({
			type: constants.TRASH_REQUEST_COMMENT_PENDING,
			payload: '',
		}),
	sendReply: async (requestId, data) => dispatch(await sendReply(requestId, data)),
	sendComment: async (requestId, data) => dispatch(await sendComment(requestId, data)),
	trashComment: async (requestId, commentId) => dispatch(await trashComment(requestId, commentId)),
	editComment: async (requestId, commentId, data) =>
		dispatch(await editComment(requestId, commentId, data)),
});

export default connect(mapStateToProps, mapDispatchToProp)(RequestComment);
