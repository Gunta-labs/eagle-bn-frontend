import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Menu(props) {
	return (
		<div className=''>
			<label className={`${props.active ? 'active-' : ''}menu mb-0 p-2 w-100 text-primary`}>
				<FontAwesomeIcon icon={props.icon} className='mr-3 textprimary' /> {props.name}{' '}
			</label>{' '}
			<hr className='divider mt-0 mb-0' />
		</div>
	);
}
export default Menu;
