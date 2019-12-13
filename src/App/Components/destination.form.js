import React from 'react';
import { faCalendar, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default (id, handleInput, values) => (
	<div>
		<br />
		<div className='text-primary'> {`Trip ${id + 1}`} </div> <br />
		<div className='row'>
			<div className='col'>
				<div className='input-group mb-3'>
					<div className='input-group-prepend'>
						<span className='form-control rounded-0'>
							<FontAwesomeIcon icon={faMapMarker} />
						</span>
					</div>
					<input
						type='text'
						className='form-control'
						placeholder='Destination country'
						aria-label='Destination country'
						id={`country-${id}`}
						onChange={handleInput}
						value={values[`country-${id}`]}
						required
					></input>
				</div>
				<div className='input-group mb-3'>
					<div className='input-group-prepend'>
						<span className='form-control rounded-0'>
							<FontAwesomeIcon icon={faMapMarker} />
						</span>
					</div>
					<input
						type='text'
						className='form-control'
						placeholder='Destination city'
						aria-label='Destination city'
						id={`city-${id}`}
						onChange={handleInput}
						value={values[`city-${id}`]}
						required
					></input>
				</div>
				<div className='input-group'>
					<div className='input-group-prepend'>
						<span className='form-control rounded-0'>
							<FontAwesomeIcon icon={faCalendar} />
						</span>
					</div>
					<input
						type='datetime-local'
						className='form-control'
						placeholder='Departure time'
						aria-label='Departure time'
						id={`departureTime-${id}`}
						onChange={handleInput}
						value={values[`departureTime-${id}`]}
						required
					></input>
				</div>
			</div>
			<div className='col'>
				<textarea
					className='form-control'
					placeholder='Reason'
					aria-label='Reason'
					id={`reason-${id}`}
					value={values[`reason-${id}`]}
					onChange={handleInput}
					required
				></textarea>
			</div>
		</div>
	</div>
);
