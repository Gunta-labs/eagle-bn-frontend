import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartO, faBookmark } from '@fortawesome/free-regular-svg-icons';
import Apis from '../../Api';
import checkToken, { token } from '../../helper/helper';
import { toast } from 'react-toastify';

class LikeAndBookMark extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			getLikeStatus: '0',
			likeStatus: '0',
		};
		this.getLikes = this.getLikes.bind(this);
		this.like = this.like.bind(this);
	}
	async getLikes() {
		const { id } = this.props;
		try {
			const res = await Apis.getLikesOfAccommodation(id);
			const { userId } = checkToken() || {};
			const liked = (res.data.data || []).map(element => element.userId).indexOf(userId);
			if (liked !== -1) {
				this.setState({
					likeStatus: '1',
				});
			} else {
				this.setState({
					likeStatus: '0',
				});
			}
			this.setState({
				getLikeStatus: (res.data.data || []).length,
			});
		} catch (error) {
			const { response } = error;
			if (response && response.status === 400) {
				toast.error(`accommodation with id ${id} was not found!`);
			} else {
				toast.error('Something went wrong!, check your internet connection');
			}
		}
	}
	async like() {
		const { id } = this.props;
		try {
			await Apis.likeAccommodation(id, token);
			this.setState({
				likeStatus: '1',
			});
			this.getLikes();
		} catch (error) {
			const { response } = error;
			if (response) {
				if (response.status === 401) {
					toast.error('you must be logged in to like an accommodation');
				} else {
					toast.error(`accommodation with id ${id} was not found!`);
				}
			} else {
				toast.error('Something went wrong!, check your internet connection');
			}
		}
	}
	componentWillMount() {
		this.getLikes();
	}

	render() {
		const { likeStatus, getLikeStatus } = this.state;
		return (
			<div className='d-flex justify-content-between'>
				<span
					className={likeStatus === '1' ? 'my-2 like-card' : 'my-2 like-card'}
					id='like'
					onClick={e => {
						e.preventDefault();
						this.like();
					}}
				>
					<FontAwesomeIcon
						icon={likeStatus === '1' ? faHeart : faHeartO}
						className={`ml-3 mr-1 ${likeStatus === '1' && 'text-danger'}`}
					/>
					{getLikeStatus === '0' ? '' : getLikeStatus}
				</span>
				<span className='my-2 mx-3 like-card'>
					<FontAwesomeIcon icon={faBookmark} className='text-dark' />
				</span>
			</div>
		);
	}
}

export default LikeAndBookMark;
