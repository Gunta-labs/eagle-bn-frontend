import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import destinationForm from '../Components/destination.form';
import requestForm from '../Components/request.form';
import sendTripRequest from '../../Redux/Actions/trip.request.action';
import formData from '../../helper/trip.request.form.data';

class TripRequest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfTrips: 1,
			values: {},
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
			forms.push(destinationForm(dest, this.handleValueChange, values));
		}
		return forms;
	}
	handleSubmit(event) {
		event.preventDefault();
		const data = formData(this.state.values);
		this.props.sendTripRequest(data);
	}
	render() {
		document.title = 'Barefoot || new request';
		return (
			<div>
				<Header showSideNav={true} active_menu={2} />
				{this.props.tripRequestStatus === 'success' && (window.location = '/requests')}
				<div className='request-container mb-3 container'>
					<div className={this.props.messageClass}> {this.props.message} </div> <br />
					<form onSubmit={this.handleSubmit}>
						{requestForm(this.handleValueChange)}
						{this.showDestinationsForm()}
						<br></br>

						<div className='row'>
							<button
								className='btn btn-primary col-xs-3 rounded-0 ml-2'
								onClick={this.addDestination}
							>
								Add more Trips
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
