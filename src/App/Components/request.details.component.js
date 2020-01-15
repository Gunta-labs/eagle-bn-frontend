import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faClock, faQuestion } from '@fortawesome/free-solid-svg-icons';
import getStatus from '../../helper/status.helper';
import dateHelper from '../../helper/date.helper';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export default function RequestDetails({ data }) {
	const { returnTime, country, city, status, id } = data;
	const trips = data.Trips.map((e, i) => {
		return (
			<React.Fragment key={i}>
				<div className='d-flex justify-content-between ml-1 mr-1 mt-0'>
					<p className='mb-0'>
						<FontAwesomeIcon icon={faMapMarker} className='mr-2 text-secondary' />
						<label className='text-secondary font-weight-bold label'>
							Destination {`${i + 1}`} :
						</label>
						<label
							className='text-secondary ml-2'
							id='destination'
						>{`${e.city}, ${e.country}`}</label>
					</p>
					<p className='mb-0'>
						<FontAwesomeIcon icon={faClock} className='mr-2 text-secondary' />
						<label className='text-secondary font-weight-bold' style={{ fontSize: '.8em' }}>
							Departure Time :
						</label>
						<label className='text-secondary ml-2'>
							{timeAgo.format(new Date(e.departureTime), 'ago')}
						</label>
					</p>
				</div>{' '}
				<div className='d-flex justify-content-between ml-1 mr-1 mt-0'>
					<p className='mb-0'>
						<FontAwesomeIcon icon={faQuestion} className='mr-2 text-secondary' />
						<label className='text-secondary font-weight-bold' style={{ fontSize: '.8em' }}>
							Reason :
						</label>
						<label className='text-secondary ml-2'>{`${e.reason}`}</label>{' '}
					</p>
				</div>
				<br />
			</React.Fragment>
		);
	});
	return (
		<>
			<div className='card-body overflow-auto'>
				<div className='list-group-item'>
					<div className='d-flex justify-content-between ml-1 mr-1 mt-2 pt-3 pb-3'>
						<p className='mb-0 mt-0'>
							<FontAwesomeIcon icon={faMapMarker} className='mr-2 text-primary' />
							<label className='text-primary font-weight-bold label small-margin-top'>
								Origin :
							</label>
							<label
								className='text-secondary ml-2 small-margin-top'
								id='origin'
							>{`${country}, ${city}`}</label>
						</p>
						<label
							className={`btn ${getStatus(status)} font-weight-bold  pt-0 text-white`}
							id='status'
							style={{ fontSize: '.8em', height: '20px' }}
						>
							{`${status}`}
						</label>
					</div>{' '}
					<div className='d-flex justify-content-between ml-1 mr-1 mt-0'>
						<p className='mb-0'>
							<FontAwesomeIcon icon={faClock} className='mr-2 text-primary' />
							<label className='text-primary font-weight-bold small-margin-top'>
								Return time :
							</label>
							<label className='text-secondary ml-2'>{`${dateHelper(
								new Date(returnTime) || undefined,
							)}`}</label>
						</p>
					</div>{' '}
				</div>
				<div className='list-group-item'>{trips}</div>
			</div>
		</>
	);
}
