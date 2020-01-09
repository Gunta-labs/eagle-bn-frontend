import React from 'react';
import { faCalendar, faMapMarker, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import locations from '../../helper/country.helper';
export default class DestinationForm extends React.Component {
	state = {
		country: null,
	};
	onInput(event) {
		event.preventDefault();
		this.setState({ country: event.target.value });
	}
	render() {
		const countryList = locations.getAllCountry().map(element => {
			return (
				<option key={element.shortName} value={element.name}>
					{element.shortName}
				</option>
			);
		});
		const cities = locations.getCountryCities(this.state.country);
		const citiesList = cities.map(element => {
			return <option key={element.name} value={element.name}></option>;
		});
		return (
			<div>
				<br />
				<div className='text-primary'>{`Destination ${this.props.id + 1}`}</div> <br />
				<div className='row'>
					<div className='col'>
						<div className='input-group mb-3'>
							<div className='input-group-prepend'>
								<span className='input-group-text text-secondary bg-white label-input'>
									<FontAwesomeIcon icon={faGlobe} className='mr-3' />
									Country
								</span>
							</div>
							<input
								list='countryData'
								type='text'
								className='form-control'
								placeholder='Destination country'
								aria-label='Destination country'
								onInput={e => this.onInput(e)}
								id={`country-${this.props.id}`}
								onChange={this.props.handleInput}
								value={this.props.values[`country-${this.props.id}`] || ''}
								required
							></input>
							<datalist id='countryData'>{countryList}</datalist>
						</div>
						<div className='input-group mb-3'>
							<div className='input-group-prepend'>
								<span className='input-group-text text-secondary bg-white label-input'>
									<FontAwesomeIcon icon={faMapMarker} className='mr-3' />
									City
								</span>
							</div>
							<input
								list={`cityData-${this.props.id}`}
								type='text'
								className='form-control'
								placeholder='Destination city'
								aria-label='Destination city'
								id={`city-${this.props.id}`}
								onChange={this.props.handleInput}
								value={this.props.values[`city-${this.props.id}`] || ''}
								autocomplete='off'
								required
							></input>
							<datalist id={`cityData-${this.props.id}`}>
								{citiesList.filter(e => e.key !== this.props.city)}
							</datalist>
						</div>
						<div className='input-group'>
							<div className='input-group-prepend'>
								<span className='input-group-text text-secondary bg-white label-input'>
									<FontAwesomeIcon icon={faCalendar} className='mr-3' />
									Departure date
								</span>
							</div>
							<input
								type='date'
								min={new Date().toISOString().split('T')[0]}
								className='form-control'
								placeholder='Departure time'
								aria-label='Departure time'
								id={`departureTime-${this.props.id}`}
								onChange={this.props.handleInput}
								value={this.props.values[`departureTime-${this.props.id}`]}
								required
							></input>
						</div>
					</div>
					<div className='col'>
						<textarea
							className='form-control'
							placeholder='Reason'
							aria-label='Reason'
							id={`reason-${this.props.id}`}
							value={this.props.values[`reason-${this.props.id}`]}
							onChange={this.props.handleInput}
							required
						></textarea>
					</div>
				</div>
			</div>
		);
	}
}
