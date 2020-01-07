import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import DestinationForm from '../Components/destination.form';
import RequestForm from '../Components/request.form';
import sendTripRequest from '../../Redux/Actions/trip.request.action';
import formData from '../../helper/trip.request.form.data';

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
	}
	addDestination(event) {
		event.preventDefault();
		this.setState(prevState => ({ numberOfTrips: prevState.numberOfTrips + 1 }));
	}
	handleValueChange(event) {
		const { values } = this.state;
		const temp = { ...values };
		temp[`${event.target.id}`] = event.target.value;
		this.setState({ values: temp });
	}
	showDestinationsForm() {
		const { numberOfTrips, values } = this.state;
		const forms = new Array(numberOfTrips);
		for (let dest = 0; dest < numberOfTrips; dest++) {
			forms.push(
				<DestinationForm
					id={dest}
					handleInput={this.handleValueChange}
					values={values}
					deleteTrip={this.deleteTrip}
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

	handleSubmit(event) {
		event.preventDefault();
		const data = formData(this.state.values);
		const dateError = this.checkDates(this.state.values, this.state.numberOfTrips);
		if (!dateError) {
			this.setState({ error: null });
			this.props.sendTripRequest(data);
		} else this.setState({ error: dateError });
	}
	render() {
		const { error, values } = this.state;
		return (
			<div>
				<Header showSideNav={true} active_menu={2} />
				{this.props.tripRequestStatus === 'success' && (window.location = '/requests')}
				<div className='request-container mb-3 container'>
					<div className={this.props.messageClass}> {this.props.message} </div> <br />
					{error && <div className='alert alert-danger'> {this.state.error} </div>}
					<form onSubmit={this.handleSubmit}>
						<RequestForm handleInput={this.handleValueChange} values={values} />
						{this.showDestinationsForm()}
						<br></br>

						<div className='row'>
							<button
								className='btn btn-primary col-xs-3 rounded-0 ml-2'
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
