import React from 'react';
import avatar from '../../Assets/images/avatar.png';
import dateHelper from '../../helper/date.helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faClock, faQuestion } from '@fortawesome/free-solid-svg-icons';

export default ({ request, user }, closeModel) => (
	<div className='dialog'>
		<div className='modal-dialog' role='document'>
			<div className='modal-content'>
				<div className='modal-header'>
					<div className='inside'>
						<img className='avatar ml-5' src={user.avatar || avatar} alt='user avatar' />
						<p className='text-secondary'> {user.email} </p>
					</div>
					<button type='button' className='dialog-close' onClick={closeModel}>
						<span aria-hidden='true'>&times;</span>
					</button>
				</div>
				<div className='modal-body'>
					{request.Trips.map((trip, index) => (
						<div className='inside'>
							<label className='text-primary font-weight-bold label small-margin-top'>
								Destination {index + 1}
							</label>
							<p className='mb-0 mt-0'>
								<FontAwesomeIcon icon={faMapMarker} className='mr-2 text-primary' />
								<label className='text-primary font-weight-bold label small-margin-top'>
									Destination :
								</label>
								<label className='text-secondary ml-2 small-margin-top'>{`${trip.city}, ${trip.country}`}</label>
							</p>
							<p className='mb-0'>
								<FontAwesomeIcon icon={faClock} className='mr-2 text-primary' />
								<label className='text-primary font-weight-bold small-margin-top'>
									Departure time :
								</label>
								<label className='text-secondary ml-2'>
									{dateHelper(new Date(trip.departureTime || undefined))}
								</label>
							</p>
							<p className='mb-0'>
								<FontAwesomeIcon icon={faQuestion} className='mr-2 text-primary' />
								<label className='text-primary font-weight-bold small-margin-top'>Reason :</label>
								<label className='text-secondary ml-2'>{trip.reason}</label>
							</p>
							<br />
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
);
