import React from 'react';
import { faCalendar, faMapMarker, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import locations from '../../helper/country.helper';

export default class RequestForm extends React.Component {
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
			return <option value={element.name}></option>;
		});
		return (
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
							type='text'
							className='form-control'
							placeholder='Origin country'
							aria-label='Origin country'
							id='country'
							onInput={e => this.onInput(e)}
							onChange={this.props.handleInput}
							required
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
							list='cityData'
							type='text'
							className='form-control'
							placeholder='Origin city'
							aria-label='Origin city'
							id='city'
							name='city'
							onChange={this.props.handleInput}
							required
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
							min={this.props.dep || new Date().toISOString().split('T')[0]}
							className='form-control'
							placeholder='Return time'
							aria-label='Return time'
							id='returnTime'
							title='Return Time(optional)'
							onChange={this.props.handleInput}
						></input>
					</div>
				</div>
			</div>
		);
	}
}
