import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function Notification(props) {
	return (
		<div className='pl-2 border-bottom'>
			<div className='d-flex justify-content-between pt-2 pl-2 pr-2'>
				<h6 className='text-dark '>Request approved</h6>
				<span className={`${!props.read ? 'text-black-50' : 'text-primary'} markOneAsRead`}>
					<FontAwesomeIcon icon={faCheck} size='sm' />
				</span>
			</div>
			<div className='d-flex justify-content-between pt-1 pl-2 pr-2 '>
				<label className='text-secondary '>Your request to kampala has been approved</label>
				<label className='text-black-50'>4d ago</label>
			</div>
		</div>
	);
}
export default Notification;
