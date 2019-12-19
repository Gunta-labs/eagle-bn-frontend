import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faClock, faEye, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import dateHelper from '../../helper/date.helper';

const getStatus = status => {
	let statusClass = '';
	if (status === 'pending') statusClass = 'btn-warning';
	else if (status === 'approved') statusClass = 'btn-success';
	else statusClass = 'btn-danger';
	return statusClass;
};

export default props => {
	const { request, index, showModel } = props;
	return (
		<div className='col-12 col-sm-12 col-md-6 col-lg-4 mt-4'>
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
						</div>
						<div className='d-flex justify-content-between ml-1 mr-1 mt-0'>
							<p className='mb-0'>
								<FontAwesomeIcon icon={faClock} className='mr-2 text-primary' />
								<label className='text-primary font-weight-bold small-margin-top'>
									Return time :
								</label>
								<label className='text-secondary ml-2'>
									{dateHelper(new Date(request.returnTime || undefined))}
								</label>
							</p>
						</div>
					</div>
					<div className='list-group-item'>
						<div className='d-flex justify-content-between ml-1 mr-1 mt-0'>
							<FontAwesomeIcon
								icon={faEye}
								className='text-primary'
								title='view'
								onClick={e => {
									e.target = { id: `view-${index}` };
									showModel(e);
								}}
							/>
							{request.status === 'pending' && (
								<React.Fragment>
									<FontAwesomeIcon icon={faCheck} className='text-primary' title='approve' />
									<FontAwesomeIcon icon={faTimes} className='text-danger' title='reject' />
								</React.Fragment>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
