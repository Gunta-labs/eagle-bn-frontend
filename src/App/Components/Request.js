import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faClock, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import dateHelper from '../../helper/date.helper';

const getStatus = status => {
	let statusClass = '';
	if (status === 'pending') statusClass = 'btn-warning';
	else if (status === 'approved') statusClass = 'btn-success';
	else statusClass = 'btn-danger';
	return statusClass;
};

const getAdditionnalTrip = trips => {
	return `${trips.length - 1} more destination(s)`;
};

function Request(props) {
	const { request } = props;
	let trip = request.Trips[0];
	if (!trip) {
		trip = {
			city: 'none',
			country: 'none',
			departureTime: undefined,
		};
		request.Trips[0] = trip;
	}
	return (
		<div className='col-12 col-sm-12 col-md-6 col-lg-4'>
			<div className='card  mt-1 ml-lg-1 ml-md-1 mr-lg-1 mr-md-1 ml-4'>
				<div className='list-group list-group-flush'>
					<div className='list-group-item'>
						<div className='d-flex justify-content-between ml-1 mr-1 mt-2'>
							<p className='mb-0 mt-0'>
								<FontAwesomeIcon icon={faMapMarker} className='mr-2 text-primary' />
								<label className='text-primary font-weight-bold label small-margin-top'>
									Origin :
								</label>
								<label
									className='text-secondary ml-2 small-margin-top'
									id='origin'
								>{`${request.city}, ${request.country}`}</label>
							</p>
							<label
								className={`btn ${getStatus(request.status)} font-weight-bold  pt-0 text-white`}
								id='status'
								style={{ fontSize: '.8em', height: '20px' }}
							>
								{request.status}
							</label>
						</div>{' '}
						<div className='d-flex justify-content-between ml-1 mr-1 mt-0'>
							<p className='mb-0'>
								<FontAwesomeIcon icon={faClock} className='mr-2 text-primary' />
								<label className='text-primary font-weight-bold small-margin-top'>
									Return time :
								</label>
								<label className='text-secondary ml-2'>
									{dateHelper(new Date(request.returnTime))}
								</label>
							</p>
						</div>{' '}
					</div>
					<div className='list-group-item'>
						<div className='d-flex justify-content-between ml-1 mr-1 mt-0'>
							<p className='mb-0'>
								<FontAwesomeIcon icon={faMapMarker} className='mr-2 text-secondary' />
								<label className='text-secondary font-weight-bold label'>Destination 1 :</label>
							</p>
							<label
								className='text-secondary ml-2'
								id='destination'
							>{`${trip.city}, ${trip.country}`}</label>
						</div>{' '}
						<div className='d-flex justify-content-between ml-1 mr-1 mt-0'>
							<p className='mb-0'>
								<FontAwesomeIcon icon={faClock} className='mr-2 text-secondary' />
								<label className='text-secondary font-weight-bold' style={{ fontSize: '.8em' }}>
									Departure Time :
								</label>
							</p>
							<label className='text-secondary ml-2'>
								{dateHelper(new Date(trip.departureTime))}
							</label>
						</div>{' '}
						<p
							className='text-secondary text-center mb-1'
							style={{ fontSize: '.9em', marginTop: '7px' }}
						>
							{getAdditionnalTrip(request.Trips)}
						</p>
					</div>
					<div className='list-group-item'>
						<div className='d-flex justify-content-between ml-1 mr-1 mt-0'>
							<FontAwesomeIcon icon={faEye} className='text-primary' />
							<FontAwesomeIcon icon={faEdit} className='text-primary' />
							<FontAwesomeIcon icon={faTrash} className='text-danger' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Request;
