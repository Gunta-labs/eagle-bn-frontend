import React from 'react';
import Menu from '../Components/Menu';
import { faHome, faTicketAlt, faBed, faUser } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
	return (
		<div className='col-lg-2 col-md-2 shadow pr-0 mb-5 bg-white' style={{ height: '100vh' }}>
			<nav>
				<Menu active={false} name='Home' icon={faHome} />
				<Menu active={true} name='Requests' icon={faTicketAlt} />
				<Menu active={false} name='Accommodations' icon={faBed} />
				<Menu active={false} name='Profile' icon={faUser} />
			</nav>
		</div>
	);
}
export default SideBar;
