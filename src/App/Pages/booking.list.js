import React from 'react';
import { connect } from 'react-redux';
import getBookings, { rateBooking } from '../../Redux/Actions/bookings.actions';
import PropTypes from 'prop-types';
import '../../Assets/scss/style.scss';
import constants from '../../Redux/constants';
import Booking from '../Components/Booking';
import Header from '../Components/Header';
import { Array } from 'es6-shim';
import AccomImg from '../../Assets/images/acc.jpg';
import { faStar, faClock, faDoorOpen, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rater from 'react-rating';
import { token } from '../../helper/helper';
import { toast } from 'react-toastify';
import getDate from '../../helper/date.helper';
import getUser from '../../helper/helper';

const mapStateToProps = state => ({
	payload: state.Booking.payload,
	pending: state.Booking.pending,
	error: state.Booking.error,
	ratingPayload: state.Booking.ratingPayload,
	ratingError: state.Booking.ratingError,
	ratingPending: state.Booking.ratingPending,
});
const mapDispatchToProps = dispatch => {
	return {
		initialize: () =>
			dispatch({
				type: constants.GET_BOOKING_PENDING,
				pending: true,
			}),
		initializeRating: () =>
			dispatch({
				type: constants.RATE_BOOKING_PENDING,
				pending: true,
			}),
		resetRating: () =>
			dispatch({
				type: constants.RATE_BOOKING_RESET,
			}),
		getBookings: async token => dispatch(await getBookings(token)),
		rateBookings: async (data, token, bookingId) =>
			dispatch(await rateBooking(data, token, bookingId)),
	};
};
export class BookingList extends React.Component {
	componentDidMount() {
		this.props.initialize();
		const token = localStorage.getItem('barefoot_token');
		this.props.getBookings(token);
	}

	state = {
		currentPage: 1,
		showModal: false,
		search_error_message: null,
		currentBooking: null,
		feedback: '',
		currentDetail: null,
	};
	handleSubmit = e => {
		e.preventDefault();
		const { feedback, currentBooking } = this.state;
		this.props.initializeRating();
		const data = { feedback, rating: currentBooking.rating };
		this.props.rateBookings(data, token, currentBooking.id);
	};
	handleInput = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	displayBookings(data, page) {
		const start = (page - 1) * 6;
		return data
			.slice(start, page * 6)
			.map((req, i) => (
				<Booking booking={req} handleClick={this.rate} viewDetails={this.viewDetails} key={i} />
			));
	}
	setPage(current, data) {
		this.setState({ currentPage: current });
		this.getPagination(data);
	}
	rate = e => {
		window.scroll(0, 0);
		this.setState({
			showModal: true,
			currentBooking: e,
			currentDetail: null,
		});
	};
	viewDetails = e => {
		window.scroll(0, 0);
		this.setState({
			currentDetail: e,
		});
	};
	getPagination(data) {
		const Npage = Math.ceil(data.length / 6);
		const pages = Array(Npage)
			.fill()
			.map((x, i) => i);
		return pages.map(p => (
			<li
				className={`page-item ${this.state.currentPage - 1 === p ? 'active' : ''}`}
				onClick={e => this.setPage(p + 1, data, e)}
			>
				<p className='page-link'>{p + 1}</p>
			</li>
		));
	}
	getError = error => {
		return error.data
			? error.data.msg
			: 'We could not upload your rating. Check if you are connected to a valid network then try again.';
	};
	navigatePagination(add, substract, data) {
		const Npage = Math.ceil(data.length / 6);
		const { currentPage } = this.state;
		const nextPage = currentPage + add - substract;
		if (!(nextPage === Npage + 1 || nextPage < 1)) {
			this.setPage(nextPage, data);
		}
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.ratingPayload) {
			toast.success('Rating recorded successfully');
			nextProps.resetRating();
			let booking = null;
			if (prevState.currentBooking) {
				booking = prevState.currentBooking;
				booking.Rating = nextProps.ratingPayload;
			}
			return {
				showModal: false,
				currentBooking: null,
				currentDetail: booking,
				feedback: '',
			};
		} else return null;
	}
	closeRating = e => {
		//e.preventDefault();
		this.props.resetRating();
		this.setState({
			showModal: false,
			currentBooking: null,
			feedback: '',
			currentDetail: null,
		});
	};
	render() {
		let { payload, pending, error, ratingError, ratingPending } = this.props;
		const data = payload && payload.data ? payload.data : [];
		const errorOrEmpty = error || (!pending && data.length === 0);
		const current = this.state.currentPage;
		const { showModal, currentDetail } = this.state;
		let currentBooking = currentDetail;
		const isHost = getUser() && (getUser().role === 'TAdmin' || getUser().role === 'host');
		return (
			<>
				<div>
					<Header active_menu={3} showSideNav={true} />
					<div
						className={`blurPanel ${showModal || currentBooking ? 'visible' : 'invisible'} `}
						onClick={this.closeRating}
					></div>
					<div className='row mainContainer bookingList'>
						{this.state.showModal && this.state.currentBooking && (
							<div className='form-rating d-flex flex-wrap align-content-center justify-content-center col-12'>
								<div
									className='rate-modal shadow-sm p-3 rounded'
									style={{ background: '#fff', height: 'fit-content', width: 50 + 'vh' }}
								>
									{ratingError && (
										<p className='alert alert-danger text-center'>{this.getError(ratingError)}</p>
									)}
									<img
										src={
											this.state.currentBooking.Accommodation.AccommodationImages.length === 0
												? AccomImg
												: this.state.currentBooking.Accommodation.AccommodationImages[0].imageurl
										}
										alt='accomodation'
										className='card-img'
									/>
									<div className='d-flex justify-content-center card-foot mt-2'>
										<Rater
											fullSymbol={
												<FontAwesomeIcon
													icon={faStar}
													className='mx-2'
													style={{ color: '#ffd700' }}
												/>
											}
											emptySymbol={
												<FontAwesomeIcon
													icon={faStar}
													className='mx-2'
													style={{ color: '#C0C0C0' }}
												/>
											}
											onClick={e => {
												this.setState({ rating: e });
											}}
											id='ratingsView'
											initialRating={this.state.currentBooking.rating}
										/>
									</div>
									<form onSubmit={this.handleSubmit} className='row'>
										<div className='col-md-12 col-lg-12'>
											<div className='form-group'>
												<textarea
													className='form-control mt-4'
													placeholder='Add your feedback here'
													rows='5'
													id='feedback'
													name='feedback'
													onChange={this.handleInput}
													required={true}
													minLength={5}
												>
													{this.state.feedback}
												</textarea>
											</div>
											<button
												className='btn btn-primary btn-block my-3 mt-2 submit-btn'
												type='submit'
												disabled={pending}
											>
												{ratingPending && <span className='spinner-grow spinner-grow-sm'></span>}
												Rate accommodation
											</button>
										</div>
									</form>
								</div>
							</div>
						)}
						{currentBooking && (
							<div className='form-rating d-flex flex-wrap align-content-center justify-content-center col-12'>
								<div
									className='rate-modal shadow-sm rounded'
									style={{ background: '#fff', height: 'fit-content', width: 50 + 'vh' }}
								>
									<div className=' '>
										<div className='p-0'>
											<img
												src={
													currentBooking.Accommodation.AccommodationImages.length === 0
														? AccomImg
														: currentBooking.Accommodation.AccommodationImages[0].imageurl
												}
												alt='accomodation'
												className='card-img'
											/>
										</div>
										<div className='d-flex flex-column card-footer text-center p-0'>
											<span className='bg-white mt-n3 shadow-sm mx-5'>
												{currentBooking.Accommodation.name}
											</span>
											<div className='d-flex justify-content-between ml-1 mr-1 mt-2'>
												<p className='mb-0 mt-0 ml-2'>
													<FontAwesomeIcon icon={faClock} className='mr-2 text-primary' />
													<label className='text-primary font-weight-bold label small-margin-top'>
														Start :
													</label>
													<label className='text-secondary ml-2 small-margin-top' id='origin'>
														{' '}
														{getDate(new Date(currentBooking.start))}
													</label>
												</p>
												<p className='mb-0 mt-0 mr-2'>
													<FontAwesomeIcon icon={faClock} className='mr-2 text-primary' />
													<label className='text-primary font-weight-bold label small-margin-top'>
														End :
													</label>
													<label className='text-secondary ml-2 small-margin-top' id='origin'>
														{' '}
														{getDate(new Date(currentBooking.end))}
													</label>
												</p>
											</div>{' '}
											<div className='d-flex justify-content-between ml-1 mr-1 mt-2'>
												<p className='mb-0 mt-0 ml-2'>
													<FontAwesomeIcon icon={faDoorOpen} className='mr-2 text-primary' />
													<label className='text-primary font-weight-bold label small-margin-top'>
														Booked space :
													</label>
													<label className='text-secondary ml-2 small-margin-top' id='origin'>
														{' '}
														{currentBooking.numberOfSpace} room(s)
													</label>
												</p>
											</div>{' '}
											<div className='d-flex justify-content-between card-foot mt-2'>
												<p className='mb-0 mt-0 ml-2'>
													<FontAwesomeIcon icon={faStar} className='mr-2 text-primary' />
													<label className='text-primary font-weight-bold label small-margin-top'>
														Rating :
													</label>
												</p>
												<Rater
													fullSymbol={
														<FontAwesomeIcon
															icon={faStar}
															className='mx-2'
															style={{ color: '#ffd700' }}
														/>
													}
													emptySymbol={
														<FontAwesomeIcon
															icon={faStar}
															className='mx-2'
															style={{ color: '#C0C0C0' }}
														/>
													}
													onClick={e => {
														currentDetail.rating = e;
														this.rate(currentDetail);
													}}
													id='singleBooking'
													initialRating={currentBooking.Rating ? currentBooking.Rating.rating : 0}
													readonly={new Date(currentBooking.start) > new Date() || isHost}
												/>
											</div>
											<div className='d-flex justify-content-between ml-1 mr-1 mt-2'>
												<p className='mb-0 mt-0 ml-2'>
													<FontAwesomeIcon icon={faComment} className='mr-2 text-primary' />
													<label className='text-primary font-weight-bold label small-margin-top'>
														Feedback :
													</label>
													<label className='text-secondary ml-2 small-margin-top' id='origin'>
														{' '}
														{currentBooking.Rating ? currentBooking.Rating.feedback : 'no feedback'}
													</label>
												</p>
											</div>{' '}
										</div>
									</div>
								</div>
							</div>
						)}
						<div className='row col-12 col-sm-12 col-md-10 col-lg-10 content-wrapper request-list'>
							{(pending || error || data.length < 1) && (
								<div className='d-flex flex-wrap align-content-center justify-content-center col-12'>
									{errorOrEmpty && (
										<div>
											<h3 className='text-secondary d-block text-center m-4 error'>
												No booking found
											</h3>
											<div className='col text-center'></div>
										</div>
									)}
									{pending && (
										<div className='col text-center'>
											<div className='spinner-border text-primary '> </div>
										</div>
									)}
								</div>
							)}
							{!pending && this.displayBookings(data, current)}
						</div>{' '}
						<div className='d-flex flex-wrap align-content-center justify-content-center col-12 mt-3'>
							<nav aria-label='Page navigation pagination mx-auto'>
								<ul className='pagination'>
									<li className='page-item'>
										<p
											className='page-link'
											aria-label='Previous'
											id='previous-nav'
											onClick={e => this.navigatePagination(0, 1, data, e)}
										>
											<span aria-hidden='true'>&laquo;</span>
											<span className='sr-only'>Previous</span>
										</p>
									</li>
									{this.getPagination(data)}
									<p
										className='page-link'
										aria-label='Next'
										id='next-nav'
										onClick={e => this.navigatePagination(1, 0, data, e)}
									>
										<span aria-hidden='true'>&raquo;</span>
										<span className='sr-only'>Next</span>
									</p>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</>
		);
	}
}

BookingList.propTypes = {
	pending: PropTypes.bool,
	payload: PropTypes.object,
	error: PropTypes.object,
	token: PropTypes.string,
};

export const Bookings = connect(mapStateToProps, mapDispatchToProps)(BookingList);
