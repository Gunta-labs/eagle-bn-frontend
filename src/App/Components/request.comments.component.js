import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { sendReply, getComments, sendComment } from '../../Redux/Actions/request.comments.action';
import constants from '../../Redux/constants/index';
import send from '../../Assets/images/send.png';

export class RequestComment extends Component {
	state = {
		reply: '',
		comment: '',
	};

	handleInput = e => {
		if (e.target.id === 'comment') {
			this.setState({
				comment: e.target.value,
			});
		} else {
			this.setState({
				reply: e.target.value,
			});
		}
	};
	handleHide = i => {
		let x = document.getElementById(`reply-${i}`);
		if (x.style.display === 'none') {
			x.style.display = 'block';
		} else {
			x.style.display = 'none';
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
		const { send_success, send_pending } = this.props;
		if (send_pending === false && send_success) {
			this.setState({ comment: '' });
			this.retreiveComment();
		}
	};

	componentDidMount() {
		this.retreiveComment();
	}

	retreiveComment() {
		const { loading_comment, getComments } = this.props;
		const { id } = this.props.props.match.params;
		loading_comment();
		getComments(id);
	}

	replies = values => {
		return values.map((e, i) => {
			return (
				<React.Fragment key={i}>
					<div className='ml-3 border'>
						<p className='font-weight-normal py-2 px-2'>
							{e['User.fullname']} {e['User.RoleId'] === 4 ? '(Line Manager)' : ''}
						</p>
						<p className='pl-2'>{e.comment}</p>
					</div>
					<br />
				</React.Fragment>
			);
		});
	};

	render() {
		const { pending_comment, comment_error, comments, reply_error, send_error } = this.props;
		const display =
			!pending_comment &&
			!comment_error &&
			comments.map((e, i) => {
				return (
					<React.Fragment key={i}>
						<div
							className='col-11'
							style={{
								border: '1px solid #EAEAEA',
								boxShadow: '0px 3px 6px #00000029',
							}}
						>
							<div className='list-group list-group-flush'>
								<div className='list-group-item pb-0'>
									<p className='font-weight-normal'>
										{e['User.fullname']} {e['User.RoleId'] === 4 ? '(Line Manager)' : ''}
									</p>
									<p className=''>{e.comment}</p>
								</div>
								<div className='list-group-item text-center text-primary'>
									{this.props.props.userId === e.userId ? (
										<FontAwesomeIcon icon={faEdit} className='float-left text-primary' />
									) : (
										''
									)}

									<span onClick={this.handleHide.bind(null, i)} id='reply-btn'>
										<FontAwesomeIcon icon={faReply} className='text-primary' />
									</span>
									{this.props.props.userId === e.userId ? (
										<FontAwesomeIcon icon={faTrash} className='float-right text-danger' />
									) : (
										''
									)}
								</div>
								<div className='list-group-item' id={`reply-${i}`} style={{ display: 'none' }}>
									<p className='font-weight-normal text-primary'>Reply</p>
									{e.replies.length ? this.replies(e.replies) : ''}
									<div className='ml-3'>
										<div className='pl-2 pt-0'>
											<p className='text-primary font-weight-normal'>Send your reply</p>
											<form
												className='comment-form'
												id={e.id}
												onSubmit={e => {
													this.sendCommentReply(e);
												}}
											>
												<input
													type='text'
													className={reply_error ? `border border-danger inp` : `inp`}
													onChange={this.handleInput}
													placeholder='Reply this Comment'
													value={this.state.reply}
												/>
												<button type='submit' className='p-0 btn bg-white bg-success send-button2'>
													<img src={send} alt='send button' className='img2' />
												</button>
												<p className='text-danger'>{reply_error}</p>
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
				{' '}
				<div className='list-group list-group-flush'>
					<span className='pt-4 pl-3 pb-3 font-weight-bold'>Comment</span>

					<div
						className='list-group-item row pl-5 border-top-0'
						style={{ height: '514px', overflowY: 'scroll' }}
					>
						{pending_comment && (
							<div className='col text-center' style={{ marginTop: '40%' }}>
								<div className='spinner-border text-primary '> </div>
							</div>
						)}
						{!pending_comment && comment_error && (
							<div className='col text-center ml-auto mr-auto' style={{ marginTop: '20%' }}>
								<h2 className='text-primary '>
									{' '}
									{'No Comment found, Be the first to add a comment'}{' '}
								</h2>
							</div>
						)}
						{display}
					</div>
					<div className='list-group-item pb-0'>
						<form
							id='submit-form'
							onSubmit={e => {
								this.sendComment(e);
							}}
						>
							<input
								placeholder='Enter Your comment here'
								type='text'
								className={send_error ? `border border-danger mt-1 inp` : `mt-1 inp`}
								onChange={this.handleInput}
								value={this.state.comment}
								id='comment'
								required
							/>
							<button type='submit' className=' p-0 btn bg-white bg-success send-button2'>
								<img src={send} alt='send button' className='img2' />
							</button>
							<p className='text-danger'>{send_error}</p>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ replyComment, getComment, sendComment }) => ({
	reply_success: replyComment.reply,
	reply_error: replyComment.error,
	reply_pending: replyComment.pending,
	pending_comment: getComment.pending,
	comments: getComment.comments,
	comment_error: getComment.error,
	send_success: sendComment.send,
	send_error: sendComment.error,
	send_pending: sendComment.pending,
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
	sendReply: async (requestId, data) => dispatch(await sendReply(requestId, data)),
	sendComment: async (requestId, data) => dispatch(await sendComment(requestId, data)),
});

export default connect(mapStateToProps, mapDispatchToProp)(RequestComment);
