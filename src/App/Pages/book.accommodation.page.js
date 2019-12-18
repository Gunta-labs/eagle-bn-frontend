import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createBookingAction from '../../Redux/Actions/booking.accommodation.action';
import constants from '../../Redux/constants';
import Header from '../Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img from '../../Assets/images/background2.svg';
import { faDoorOpen, faClock, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import BaseUrl from '../../Api/config';

export class CreateBooking extends React.Component {
	state = {
		start: '',
		end: '',
		numberOfSpace: 1,
	};
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.bookings.payload) {
			window.location.assign(`${BaseUrl}/bookings/${nextProps.bookings.payload.id}`);
		} else return null;
	}
	handleInput = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.initialize();
		const { create } = this.props;
		const { start, end, numberOfSpace } = this.state;
		const data = {
			start,
			end,
			numberOfSpace,
			accommodationId: this.props.match.params.id,
		};
		const token = localStorage.getItem('barefoot_token');
		create(data, token);
	};
	getError = error => {
		return error.data
			? error.data.msg
			: 'We could not upload your data. Check if you are connected to a valid network then try again.';
	};
	render() {
		const { start, end, numberOfSpace } = this.state;
		const { error, payload, pending } = this.props.bookings;
		const display = (
			<div className='d-flex'>
				<Header active_menu={1} showSideNav={true} />
				<div className='container content-wrapper create-accommodation'>
					<h5 className='text-primary mb-4'> Booking</h5>
					<div className='row'>
						<div className='col-md-12 col-lg-12 bg-sm-white'>
							<form onSubmit={this.handleSubmit} className='row'>
								<div className='col-md-6 col-lg-6'>
									{error && (
										<p className='alert alert-danger text-center'>{this.getError(error)}</p>
									)}
									{payload && <p className='alert alert-success'>uploaded successfully</p>}
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
											className='form-control'
											onChange={this.handleInput}
											placeholder='Starting date'
											required={true}
											value={start}
											pattern='.{4,}'
											onInvalid='name should have a minimum of 4 characters'
										/>
									</div>
									<div className='input-group mb-4'>
										<div className='input-group-prepend'>
											<span className='input-group-text text-secondary bg-white'>
												<FontAwesomeIcon icon={faCalendarTimes} className='mr-4' />
												Ending date
											</span>
										</div>
										<input
											type='date'
											name='end'
											className='form-control'
											onChange={this.handleInput}
											placeholder='Ending date'
											required={true}
											value={end}
											pattern='.{5,}'
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
											name='numberOfSpace'
											className='form-control'
											onChange={this.handleInput}
											placeholder='Number of space'
											required={true}
											value={numberOfSpace}
											pattern='.{5,}'
										/>
									</div>
									<button
										className='btn btn-primary btn-block my-4 submit-btn'
										type='submit'
										disabled={pending}
									>
										{pending && <span className='spinner-grow spinner-grow-sm'></span>}
										Book this accommodation
									</button>
								</div>
								<div className='col-md-6 col-lg-6 text-center d-flex flex-wrap align-content-center justify-content-center'>
									<div class='card' style={{ width: 18 + 'rem' }} mx-auto>
										<img className='card-img-top' src={img} alt='accommodation' />
										<div class='card-body'>
											<h5 class='card-title'>House of hapiness</h5>
										</div>
									</div>
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
	};
};

export const mapStateToProps = ({ bookings }) => ({
	bookings,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBooking);
