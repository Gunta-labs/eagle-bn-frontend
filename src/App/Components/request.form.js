import React from 'react';
import { faCalendar, faMapMarker, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default handleInput => (
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
					placeholder='Origin country'
					aria-label='Origin country'
					id='country'
					onChange={handleInput}
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
					placeholder='Origin city'
					aria-label='Origin city'
					id='city'
					onChange={handleInput}
					required
				></input>
			</div>
		</div>
		<div className='col'>
			<div className='input-group mb-3'>
				<div className='input-group-prepend'>
					<span className='form-control rounded-0'>
						<FontAwesomeIcon icon={faCalendar} />
					</span>
				</div>
				<input
					type='datetime-local'
					className='form-control'
					placeholder='Return time'
					aria-label='Return time'
					id='returnTime'
					title='Return Time(optional)'
					onChange={handleInput}
				></input>
			</div>
			<div className='input-group mb-3'>
				<div className='input-group-prepend'>
					<span className='form-control rounded-0'>
						<FontAwesomeIcon icon={faStopwatch} />
					</span>
				</div>
				<input
					type='text'
					className='form-control'
					placeholder='Time Zone'
					aria-label='Time Zone'
					id='timeZone'
					required
					onChange={handleInput}
				></input>
			</div>
		</div>
	</div>
);
