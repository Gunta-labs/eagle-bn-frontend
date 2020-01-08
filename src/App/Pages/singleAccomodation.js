import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import {
	singleAccomodation,
	GetFeedback,
	deleteAccommodation,
} from '../../Redux/Actions/singleAccomodations.action';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import LikeAndBookMark from '../Components/like.accommodation';
import * as checkTock from '../../helper/helper';

export class singleAccomodations extends Component {
	state = {
		img: null,
	};
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.singleAccomodation(id);
		this.props.getFeedback(id);
		this.props.inits();
	}

	changeImage = link => {
		this.setState({
			img: link,
		});
	};

	async handleDelete(accId) {
		await this.props.deleteAccommo(accId);
		if (this.props.deleted) {
			window.location.assign('/accommodations');
		}
	}

	componentDidUpdate(prevState) {
		if (prevState.pending !== this.props.pending) {
			const top_img =
				this.props.payload !== null && this.props.payload.AccommodationImages.length > 0
					? this.props.payload.AccommodationImages[0].imageurl
					: '';
			this.setState({
				img: top_img,
			});
		}
	}

	display_feed = feedback => {
		const recent_feedback =
			feedback && feedback.feedbackList
				? feedback.feedbackList.map((e, i) => {
						return (
							<div className='d-flex' key={i}>
								{' '}
								<div className='w-15'>
									<img src={e.avatar} className='img-feedback border border-black' alt=' No' />
									<p className='m-auto pl-2'>{e.author}</p>{' '}
								</div>{' '}
								<div className='w-85'>
									{' '}
									<p className='border border-dark rounded mt-2 ml-2'>{e.feedback}</p>{' '}
								</div>{' '}
							</div>
						);
				  })
				: '';
		return recent_feedback;
	};

	display = (payload, feedback, feedback_error, id) => {
		let avg =
			feedback_error === null && feedback && feedback.averageRating !== undefined
				? feedback.averageRating
				: 0;
		const {
			AccommodationImages,
			address,
			amenities,
			availableSpace,
			cost,
			description,
			name,
			currency,
		} = payload;
		const images = AccommodationImages.length > 0 ? AccommodationImages : [];
		const imgs = images.map((e, i) => {
			return (
				<img
					key={i}
					src={e.imageurl}
					className='target-img pl-2'
					style={{ height: '150px', width: '150px', cursor: 'pointer' }}
					alt=''
					onClick={e => {
						this.changeImage(e.target.src);
					}}
				/>
			);
		});

		return (
			<>
				<Header />
				<div className='acc-container'>
					<h4 className='mt-5 mb-3 text-primary '> Single Accomomdation</h4>
					<div className='row gallery-card'>
						<div className='col-md-6 shadow-sm'>
							{images.length !== 0 ? (
								<>
									<div className='col-md-12 img-card-display'>
										<img
											src={this.state.img}
											style={{ height: '100%', width: '100%' }}
											className='target-img'
											alt=''
										/>
									</div>
									<div className='col-md-12 pt-2 img-scroll-display'>{imgs}</div>
								</>
							) : (
								<>
									{' '}
									<center>No Images</center>{' '}
								</>
							)}
						</div>
						<div className='col-md-6 p-5 gallery-card shadow-sm'>
							<div className='row '>
								<h3 className='text-primary bold-text'>{name}</h3>
								<button className='btn btn-sm shadow-sm ml-auto text-primary bold-text'>
									{`${cost} ${currency}`}/NIGHT
								</button>
							</div>
							<h4 className='bold-text pt-3 pb-3'>{address}</h4>
							<h5 className='bold-text'>description</h5>
							<p>{description}</p>
							<h5 className='pt-3 bold-text'>amenities</h5>
							<p>{amenities}</p>
							<div className='row'>
								<h1 className='text-primary'>{availableSpace.split(' ')[0]}</h1>
								<h5 className='mx-2 mt-3 text-primary'>{availableSpace.split(' ')[1]} available</h5>
								{feedback_error !== null && (
									<div className='ml-auto'>
										<span className='mx-2'>{`${feedback_error}`}</span>
									</div>
								)}
								{feedback_error === null && (
									<div className='ml-auto'>
										<span className='mx-2'>
											{
												<StarRatings
													rating={JSON.parse(avg)}
													starRatedColor='#e99434'
													numberOfStars={5}
													name='rating'
													starEmptyColor='F5F1F1'
													starDimension='25px'
													starBorder='#e99434'
												/>
											}
										</span>
										<button className='btn btn-sm shadow-sm '>{avg}</button>
									</div>
								)}
							</div>
							<div className='d-flex pt-5 mb-3'>
								<Link to={`/accommodations/${id}/book`} className='btn btn-primary btn-lg'>
									<span> Book</span>
								</Link>
								{checkTock.token && checkTock.default().userId === this.props.payload.userid && (
									<button
										id='deleteAcc'
										type='button'
										className='btn btn-danger btn-lg ml-5'
										onClick={e => {
											e.preventDefault();
											this.handleDelete(id);
										}}
									>
										<span> Delete </span>
									</button>
								)}
							</div>
							<LikeAndBookMark id={id} />
						</div>
						<div className='col-12 flex-column acc-container border'>
							<h5 className='pl-n3 text-primary'>Recent Feedback</h5>
							<span className='draw draw-light'></span>
							{feedback_error !== null && (
								<p className='ml-md-2'>{`${feedback_error} and no feedback for this accomodations`}</p>
							)}
							{feedback_error === null && (
								<div className='col-sm-6'>{this.display_feed(feedback)}</div>
							)}
						</div>
					</div>
				</div>
			</>
		);
	};

	render() {
		document.title = 'Barefoot || single-accommodation';
		const { payload, error, pending, feedback, feedback_error } = this.props;
		const { id } = this.props.match.params;

		return (
			<>
				{pending && (
					<>
						<Header />
						<div className='w-100 p-5'>
							<div className='error-msg text-center w-100'>
								<span className=' spinner-load spinner-border text-info text-secondary d-block text-center mx-auto error' />
							</div>
						</div>
					</>
				)}
				{error && (
					<>
						<Header />
						<div className='w-100 p-5'>
							<div className='error-msg'>
								{' '}
								<h3 className='text-secondary d-block text-center my-auto error'>{error}</h3>
							</div>
						</div>
					</>
				)}
				{!pending && payload && this.display(payload, feedback, feedback_error, id)}
			</>
		);
	}
}

export const mapStateToPros = state => ({
	payload: state.SingleAccomodations.data,
	error: state.SingleAccomodations.error,
	pending: state.SingleAccomodations.pending,
	feedback: state.AccomodationFeedback.data,
	feedback_error: state.AccomodationFeedback.error,
	deleted: state.DeleteAccommodations.deleted,
	data: state.DeleteAccommodations.data,
	delete_error: state.DeleteAccommodations.delete_error,
});

export const mapDispatchToProps = dispatch => {
	return {
		getFeedback: async id => dispatch(await GetFeedback(id)),
		singleAccomodation: async id => dispatch(await singleAccomodation(id)),
		deleteAccommo: async id => dispatch(await deleteAccommodation(checkTock.token, id)),
		inits: () =>
			dispatch({
				type: 'SINGLE_ACCOMODATION_PENDING',
				pending: true,
			}),
	};
};

export default connect(mapStateToPros, mapDispatchToProps)(singleAccomodations);
