import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createBookingAction from '../../Redux/Actions/booking.accommodation.action';
import constants from '../../Redux/constants';
import Header from '../Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img from '../../Assets/images/background2.svg';
import { faDoorOpen, faClock } from '@fortawesome/free-solid-svg-icons';
import { singleAccomodation } from '../../Redux/Actions/singleAccomodations.action';

export class CreateBooking extends React.Component {
	state = {
		start: '',
		end: '',
		numberOfSpace: 1,
		error: null,
	};
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.getAccommodation(id);
	}
	handleInput = e => {
		this.start = e.target.id === 'start' ? e.target.value : '';
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.bookings.payload) {
			window.location.href = '/bookings';
		}
	}
	addDate(date) {
		if (date) {
			var tomorrow = new Date(date);
			tomorrow.setDate(tomorrow.getDate() + 1);
			console.log(tomorrow);
			return tomorrow.toISOString().split('T')[0];
		}
		return undefined;
	}
	handleSubmit = e => {
		const accommodation = this.props.SingleAccomodations.data;
		e.preventDefault();
		const { create } = this.props;
		const { start, end, numberOfSpace } = this.state;
		const data = {
			start,
			end,
			numberOfSpace,
			accommodationId: this.props.match.params.id,
		};
		const token = localStorage.getItem('barefoot_token');
		if (this.validate(start, end)) {
			if (numberOfSpace <= Number.parseInt(accommodation.availableSpace, 10)) {
				this.props.initialize();
				create(data, token);
			} else {
				this.setState({
					error: {
						data: {
							msg: `This accommodation has only ${accommodation.availableSpace} rooms avaliable`,
						},
					},
				});
			}
		}
	};
	validate(start, end) {
		const startingDate = new Date(start);
		const endingDate = new Date(end);

		if (startingDate <= new Date()) {
			this.setState({ error: { data: { msg: 'The starting date should be greater than today' } } });
			return false;
		} else if (startingDate > endingDate) {
			this.setState({
				error: { data: { msg: 'The starting date should go beyond the ending date' } },
			});
			return false;
		}
		this.setState({ error: null });
		return true;
	}
	getError = error => {
		return error.data
			? error.data.msg
			: 'We could not upload your data. Check if you are connected to a valid network then try again.';
	};
	render() {
		document.title = 'Barefoot || book_accommodation';
		const { start, end, numberOfSpace } = this.state;
		const { error, payload, pending } = this.props.bookings;
		const err = this.state.error || error;
		const { data } = this.props.SingleAccomodations;
		const image =
			data && data.AccommodationImages.length > 0 ? data.AccommodationImages[0].imageurl : img;
		const display = (
			<div className='d-flex'>
				<Header active_menu={2} showSideNav={true} />
				<div className='container content-wrapper create-accommodation'>
					<h5 className='text-secondary mb-5 ml-lg-5 ml-md-5 text-center'> Book accommodation</h5>
					<div className='row'>
						<div className='col-md-12 col-lg-12 bg-sm-white'>
							<form onSubmit={this.handleSubmit} className='row'>
								<div className='col-md-5 ml-lg-5 ml-md-3 col-lg-4 text-center d-flex flex-wrap align-content-center justify-content-center'>
									{data && (
										<a className='nav-link' href={`/accommodations/${data.id}`}>
											<div class='card mx-4' mx-auto>
												<img className='card-img-top' src={image} alt='accommodation' />
												<div class='card-body'>
													<h5 class='card-title'>{data.name}</h5>
													<div className='d-flex justify-content-between ml-1 mr-1 mt-0'>
														<p className='mb-0'>
															<FontAwesomeIcon icon={faDoorOpen} className='mr-2 text-primary' />
															<label className='text-primary small-margin-top'>
																{`Available space : ${data.availableSpace} rooms`}
															</label>
															<label className='text-secondary ml-2'>
																{`Cost : ${data.cost} ${data.currency} / day`}
															</label>
														</p>
													</div>{' '}
												</div>
											</div>
										</a>
									)}
								</div>
								<div className='col-md-7 col-lg-7'>
									{err && <p className='alert alert-danger text-center'>{this.getError(err)}</p>}
									{payload && (
										<div>
											<p className='alert alert-success'>uploaded successfully</p>
										</div>
									)}
									<div className='input-group mb-4 mt-1'>
										<div className='input-group-prepend'>
											<span className='input-group-text text-secondary bg-white'>
												<FontAwesomeIcon icon={faClock} className='mr-3' />
												Starting date
											</span>
										</div>
										<input
											type='date'
											name='start'
											id='start'
											min={new Date().toISOString().split('T')[0]}
											className='form-control'
											onChange={this.handleInput}
											placeholder='Starting date'
											required={true}
											value={start}
											onInvalid='name should have a minimum of 4 characters'
										/>
									</div>
									<div className='input-group mb-4'>
										<div className='input-group-prepend'>
											<span className='input-group-text text-secondary bg-white'>
												<FontAwesomeIcon icon={faClock} className='mr-4' />
												Ending date
											</span>
										</div>
										<input
											type='date'
											name='end'
											min={this.addDate(this.start) || new Date().toISOString().split('T')[0]}
											className='form-control'
											onChange={this.handleInput}
											placeholder='Ending date'
											required={true}
											value={end}
										/>
									</div>
									<div className='input-group mb-4'>
										<div className='input-group-prepend'>
											<span className='input-group-text text-secondary bg-white'>
												<FontAwesomeIcon icon={faDoorOpen} className='mr-3' />
												Number of rooms
											</span>
										</div>
										<input
											type='number'
											min={1}
											name='numberOfSpace'
											className='form-control'
											onChange={this.handleInput}
											placeholder='Number of space'
											required={true}
											value={numberOfSpace}
										/>
									</div>
									<button
										className='btn btn-primary btn-block my-4 submit-btn'
										type='submit'
										disabled={pending}
									>
										{pending && <span className='spinner-grow spinner-grow-sm'></span>}
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
		return display;
	}
}

CreateBooking.propTypes = {
	bookings: PropTypes.object.isRequired,
};

export const mapDispatchToProps = dispatch => {
	return {
		initialize: () =>
			dispatch({
				type: constants.BOOKING_PENDING,
				pending: true,
			}),
		create: async (data, token) => dispatch(await createBookingAction(data, token)),
		getAccommodation: async id => dispatch(await singleAccomodation(id)),
	};
};

export const mapStateToProps = ({ bookings, SingleAccomodations }) => ({
	bookings,
	SingleAccomodations,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBooking);
