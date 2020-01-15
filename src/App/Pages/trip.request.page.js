import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import DestinationForm from '../Components/destination.form';
import RequestForm from '../Components/request.form';
import sendTripRequest from '../../Redux/Actions/trip.request.action';
import formData from '../../helper/trip.request.form.data';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TripRequest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfTrips: 1,
			values: {},
			error: null,
		};
		this.showDestinationsForm = this.showDestinationsForm.bind(this);
		this.addDestination = this.addDestination.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.myref = React.createRef();
	}
	onInput(event) {
		event.preventDefault();
		this.setState({ country: event.target.value });
	}
	addDestination(event) {
		event.preventDefault();
		this.setState(prevState => ({ numberOfTrips: prevState.numberOfTrips + 1 }));
	}
	handleValueChange(event) {
		this.depart = event.target.id.match('departureTime') ? event.target.value : '';
		if (event.target.name === 'city') {
			this.city = event.target.value;
		}
		const { values } = this.state;
		const temp = { ...values };
		temp[`${event.target.id}`] = event.target.value;
		this.setState({ values: temp });
	}
	deleteTrip(e, dest) {
		const { values } = this.state;
		delete values[`country-${dest}`];
		delete values[`city-${dest}`];
		delete values[`departureTime-${dest}`];
		delete values[`reason-${dest}`];
		this.checkDests(dest, values);
		this.setState({ numberOfTrips: this.state.numberOfTrips - 1, values });
	}
	showDestinationsForm() {
		const { numberOfTrips, values } = this.state;
		const forms = new Array(numberOfTrips);
		for (let dest = 0; dest < numberOfTrips; dest++) {
			forms.push(
				<DestinationForm
					ref={this.myref}
					id={dest}
					handleInput={this.handleValueChange}
					values={values}
					deleteTrip={e => this.deleteTrip(e, dest)}
					city={this.city}
					addDate={this.addDate}
				/>,
			);
		}
		return forms;
	}
	checkDates(values, destinationNumber) {
		const returnT = new Date(values['returnTime']);
		if (returnT <= new Date()) return 'Return time should not be in the past';
		for (let i = 0; i < destinationNumber; i++) {
			const dDate = new Date(values[`departureTime-${i}`]);
			if (dDate <= new Date() || dDate > returnT)
				return `The departure time in destination ${i +
					1} should not be in the past or go beyond the return time`;
		}
		return null;
	}
	checkDests(id, values) {
		for (let i = id; i < this.state.numberOfTrips; i++) {
			values[`city-${i}`] = values[`city-${i + 1}`];
			delete values[`city-${i + 1}`];
			values[`country-${i}`] = values[`country-${i + 1}`];
			delete values[`country-${i + 1}`];
			values[`departureTime-${i}`] = values[`departureTime-${i + 1}`];
			delete values[`departureTime-${i + 1}`];
			values[`reason-${i}`] = values[`reason-${i + 1}`];
			delete values[`reason-${i + 1}`];
		}
		this.setState({ values });
	}
	handleSubmit(event) {
		this.depart = event.target.id.match('departureTime') ? event.target.value : '';

		event.preventDefault();
		const data = formData(this.state.values);

		const dateError = this.checkDates(this.state.values, this.state.numberOfTrips);
		if (!dateError) {
			this.setState({ error: null });
			this.props.sendTripRequest(data);
		} else this.setState({ error: dateError });
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
	render() {
		const { error, values } = this.state;
		document.title = 'Barefoot || new request';
		return (
			<div>
				<Header showSideNav={true} active_menu={2} />
				{this.props.tripRequestStatus === 'success' && (window.location = '/requests')}
				<div className='request-container mb-3 container'>
					<div className={this.props.messageClass}> {this.props.message} </div> <br />
					{error && <div className='alert alert-danger'> {this.state.error} </div>}
					<form onSubmit={this.handleSubmit}>
						<RequestForm handleInput={this.handleValueChange} values={values} dep={this.depart} />
						{this.showDestinationsForm()}
						<br></br>
						<div className='col pl-0'>
							<div className='input-group mb-3'>
								<div className='input-group-prepend'>
									<span className='input-group-text text-secondary bg-white label-input'>
										<FontAwesomeIcon icon={faCalendar} className='mr-3' />
										Return date
									</span>
								</div>
								<input
									type='date'
									min={this.addDate(this.depart) || new Date().toISOString().split('T')[0]}
									className='form-control'
									placeholder='Return time'
									aria-label='Return time'
									id='returnTime'
									title='Return Time(optional)'
									onChange={this.handleValueChange}
								></input>
							</div>
						</div>
						<div className='row'>
							<button
								className='btn btn-primary col-xs-3 rounded-0 ml-2'
								id='add-trip'
								onClick={this.addDestination}
							>
								Add more Destinations
							</button>
							<input
								type='submit'
								className='btn btn-link col-xs-3 border rounded-0 ml-2'
								value='Submit request'
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

TripRequest.propTypes = {
	tripRequestStatus: propTypes.string,
	messageClass: propTypes.string,
	sendTripRequest: propTypes.func,
};

const mapStateToProps = props => {
	return {
		tripRequestStatus: props.MakeTripRequest.tripRequestStatus,
		message: props.MakeTripRequest.message,
		messageClass: props.MakeTripRequest.messageClass,
	};
};

export default connect(mapStateToProps, { sendTripRequest })(TripRequest);
