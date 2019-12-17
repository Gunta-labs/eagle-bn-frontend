import React, { Component } from 'react';
import { connect } from 'react-redux';
import img from '../../Assets/images/acc.jpg';
import Header from '../Components/Header';
import { singleAccomodation, GetFeedback } from '../../Redux/Actions/singleAccomodations.action';

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

	display = (payload, feedback, feedback_error) => {
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
					<h4 className='mt-5 mb-3 text-primary '> Single Accomodation</h4>
					<div className='row gallery-card'>
						<div className='col-md-6 p-3'>
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
									<div className='col-md-12 img-scroll-display'>{imgs}</div>
								</>
							) : (
								<>
									{' '}
									<center>No Images</center>{' '}
								</>
							)}
						</div>
						<div className='col-md-6 p-5 gallery-card'>
							<div className='row '>
								<h3 className='text-primary bold-text'>{name}</h3>
								<button className='btn btn-sm shadow-sm ml-auto text-primary bold-text'>
									{`${cost} ${currency}`}/NIGHT
								</button>
							</div>
							<h4 className='text-bold pt-3 pb-3'>{address}</h4>
							<h5 className=''>description</h5>
							<p>{description}</p>
							<h5 className='pt-3'>amenities</h5>
							<p>{amenities}</p>
							<div className='d-flex'>
								<h1 className='text-primary'>{availableSpace.split(' ')[0]}</h1>
								<h5 className='mx-2 mt-3 text-primary'>{availableSpace.split(' ')[1]} available</h5>
								{feedback_error !== null && (
									<div className='ml-auto'>
										<span className='mx-2'>{`${feedback_error}`}</span>
									</div>
								)}
								{feedback_error === null && (
									<div className='ml-auto'>
										<span className='mx-2'>jddddhdshdsh</span>
										<button className='btn btn-sm shadow-sm '>{avg}</button>
									</div>
								)}
							</div>
							<div className='d-flex pt-5'>
								<button className='btn btn-primary btn-lg'>
									<span> </span> Book it<span> </span>
								</button>
								<button className='borger border-dark btn ml-auto btn-lg'>bookmark</button>
							</div>
						</div>
						<div className='col-12 flex-column acc-container border'>
							<h5 className='pl-n3 text-primary'>Recent Feedback</h5>
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
		const { payload, error, pending, feedback, feedback_error } = this.props;

		return (
			<>
				{pending && (
					<div className='col-md-12 p-5' style={{ height: '800px', width: '600px' }}>
						<center>
							<div
								className='spinner-grow text-info m-auto'
								style={{ height: '300px', width: '300px' }}
							/>
						</center>
					</div>
				)}
				{error && (
					<div className='col-md-12 p-5' style={{ height: '800px', width: '600px' }}>
						<h3 className='text-secondary d-block text-center m-4 error'>{error}</h3>
						<div className='col text-center'></div>
					</div>
				)}
				{!pending && payload && this.display(payload, feedback, feedback_error)}
			</>
		);
	}
}

const mapStateToPros = state => ({
	payload: state.SingleAccomodations.data,
	error: state.SingleAccomodations.error,
	pending: state.SingleAccomodations.pending,
	feedback: state.AccomodationFeedback.data,
	feedback_error: state.AccomodationFeedback.error,
});

const mapDispatchToProps = dispatch => {
	return {
		getFeedback: async id => dispatch(await GetFeedback(id)),
		singleAccomodation: async id => dispatch(await singleAccomodation(id)),
		inits: () =>
			dispatch({
				type: 'SINGLE_ACCOMODATION_PENDING',
				pending: true,
			}),
	};
};

export default connect(mapStateToPros, mapDispatchToProps)(singleAccomodations);
