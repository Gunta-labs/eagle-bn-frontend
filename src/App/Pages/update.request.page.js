import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import updateRequest from '../../Redux/Actions/update.request';
import getRequest from '../../Redux/Actions/single.request.action';
import constants from '../../Redux/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { token } from '../../helper/helper';
import { Redirect } from 'react-router-dom';
import { faCalendar, faMapMarker, faGlobe } from '@fortawesome/free-solid-svg-icons';
import locations from '../../helper/country.helper';

export class UpdateRequest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Trips: [],
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleTripChange = this.handleTripChange.bind(this);
	}

	async componentDidMount() {
		const { reqId } = this.props.match.params;
		const request = await getRequest(reqId);
		this.setState(request.payload);
	}

	onInput(event) {
		event.preventDefault();
		this.setState({ country: event.target.value });
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}
	handleTripChange(event) {
		this.depart = event.target.name.match('departureTime') ? event.target.value : '';
		const temp = { ...this.state };
		temp.Trips[parseInt(event.target.name.split('-')[1])][event.target.name.split('-')[0]] =
			event.target.value;
		this.setState(temp);
	}
	handleSubmit = e => {
		e.preventDefault();
		const { reqId } = this.props.match.params;
		const { country, city, returnTime, Trips } = this.state;
		const data = {
			country,
			city,
			returnTime,
			Trips,
		};
		this.props.update(data, token, reqId);
	};
	render() {
		const { Trips } = this.state;
		const countryList = locations.getAllCountry().map(element => {
			return (
				<option key={element.shortName} value={element.name}>
					{element.shortName}
				</option>
			);
		});
		const cities = locations.getCountryCities(this.state.country);
		const citiesList = cities.map(element => {
			return <option value={element.name}></option>;
		});
		return (
			<div>
				<Header showSideNav={true} active_menu={2} />
				<div className='request-container mb-3 container'>
					<nav aria-label='breadcrumb mt-5'>
						<ol class='breadcrumb bg-white'>
							<li class='breadcrumb-item'>
								<a href='/'>Home</a>
							</li>
							<li class='breadcrumb-item active' aria-current='page'>
								Edit Request
							</li>
						</ol>
					</nav>
					{this.props.error && <p className='alert alert-warning'>you have no permissions</p>}
					{this.props.UpdateRequest && (
						<Redirect to={`/requests/${this.props.match.params.reqId}`} />
					)}
					<form onSubmit={this.handleSubmit} id='submit-form'>
						<div className='row'>
							<div className='col'>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text text-secondary bg-white label-input'>
											<FontAwesomeIcon icon={faGlobe} className='mr-3' />
											Origin country
										</span>
									</div>
									<input
										list='countryData'
										id='country'
										type='text'
										className='form-control'
										placeholder='Origin country'
										aria-label='Origin country'
										name='country'
										onInput={e => this.onInput(e)}
										onChange={this.handleInputChange}
										value={this.state.country}
									></input>
									<datalist id='countryData'>{countryList}</datalist>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text text-secondary bg-white label-input'>
											<FontAwesomeIcon icon={faMapMarker} className='mr-3' />
											Origin city
										</span>
									</div>
									<input
										type='text'
										list='cityData'
										className='form-control'
										placeholder='Origin city'
										aria-label='Origin city'
										name='city'
										onChange={this.handleInputChange}
										value={this.state.city}
									></input>
									<datalist id='cityData'>{citiesList}</datalist>
								</div>
							</div>
							<div className='col'>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text text-secondary bg-white label-input'>
											<FontAwesomeIcon icon={faCalendar} className='mr-3' />
											Return date
										</span>
									</div>
									<input
										type='date'
										className='form-control'
										placeholder='Return time'
										aria-label='Return time'
										min={this.depart || new Date().toISOString().split('T')[0]}
										name='returnTime'
										title='Return Time(optional)'
										onChange={this.handleInputChange}
										value={
											this.state.returnTime &&
											(this.state.returnTime.match('T')
												? this.state.returnTime.split('T')[0]
												: this.state.returnTime.split(' ')[0])
										}
									></input>
								</div>
							</div>
						</div>

						{/* mapp */}
						{Trips &&
							Trips.map((e, i) => {
								return (
									<>
										<p>Trip requests {1 + i}</p>
										<div class='row mb-3' key={i}>
											<div class='col'>
												<div class='input-group mb-3'>
													<span className='input-group-text text-secondary bg-white label-input'>
														<FontAwesomeIcon icon={faGlobe} className='mr-3' />
														Origin country
													</span>
													<input
														list='countryData'
														type='text'
														className='form-control country-trip'
														placeholder='Destination country'
														aria-label='Destination country'
														onInput={e => this.onInput(e)}
														name={`country-${i}`}
														value={e.country}
														onChange={this.handleTripChange}
														required
													/>
													<datalist id='countryData'>{countryList}</datalist>
												</div>
												<div class='input-group mb-3'>
													<div className='input-group-prepend'>
														<span className='input-group-text text-secondary bg-white label-input'>
															<FontAwesomeIcon icon={faMapMarker} className='mr-3' />
															Origin city
														</span>
													</div>
													<input
														type='text'
														class='form-control'
														placeholder='Destination city'
														aria-label='Destination city'
														value={e.city}
														name={`city-${i}`}
														onChange={this.handleTripChange}
														required
													/>
												</div>
												<div class='input-group'>
													<div className='input-group-prepend'>
														<span className='input-group-text text-secondary bg-white label-input'>
															<FontAwesomeIcon icon={faCalendar} className='mr-3' />
															Departure time
														</span>
													</div>
													<input
														type='date'
														class='form-control'
														placeholder='Departure time'
														aria-label='Departure time'
														min={new Date().toISOString().split('T')[0]}
														name={`departureTime-${i}`}
														value={new Date(e.departureTime).toISOString().split('T')[0]}
														onChange={this.handleTripChange}
														required
													/>
												</div>
											</div>
											<div class='col'>
												<textarea
													class='form-control'
													placeholder='Reason'
													aria-label='Reason'
													name={`reason-${i}`}
													onChange={this.handleTripChange}
													value={e.reason}
													required
												></textarea>
											</div>
										</div>
									</>
								);
							})}
						<button className='btn btn-primary btn-block my-3 mt-4' type='submit'>
							Update
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export const mapDispatchToProps = dispatch => {
	return {
		initialize: () =>
			dispatch({
				type: constants.UPDATE_REQUEST_PENDING,
				pending: true,
			}),
		update: async (data, token, reqId) => dispatch(await updateRequest(data, token, reqId)),
	};
};

export const mapStateToProps = ({ UpdateRequest, Request }) => ({
	UpdateRequest: UpdateRequest.payload,
	error: UpdateRequest.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequest);
