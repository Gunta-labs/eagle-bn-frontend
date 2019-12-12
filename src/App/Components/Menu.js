import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Menu(props) {
	return (
		<li className={`${props.active ? 'menu-active' : ''} nav-item m-2`}>
			<a className='nav-link text-secondary' href='/'>
				<FontAwesomeIcon icon={props.icon} />
				<span className='ml-3'>{props.name}</span>
			</a>
		</li>
	);
}
export default Menu;
