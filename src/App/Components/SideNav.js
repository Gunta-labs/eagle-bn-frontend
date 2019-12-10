import React from 'react';
import avatar from '../../Assets/images/avatar.png';
import { faUser, faFileAlt, faClipboard, faBed } from '@fortawesome/free-solid-svg-icons';
import checkToken from '../../helper/helper';
import Menu from '../Components/Menu';

const { role, fullname } = checkToken() || {};

const requestMenu = [
	{ name: 'my account', icon: faUser, active: true },
	{ name: 'trip requests', icon: faClipboard, active: false },
	{ name: 'accommodations', icon: faBed, active: false },
	{ name: 'history', icon: faFileAlt, active: false },
];
function getMenus(role, active) {
	switch (role || 'requester') {
		case 'requester':
			return requestMenu.map((menu, index) => (
				<Menu name={menu.name} active={index === active} icon={menu.icon} />
			));
		default:
			return '';
	}
}

function SideNav(props) {
	return (
		<ul className='navbar-nav mr-auto sidenav shadow-sm' id='navAccordion'>
			<li className='nav-item user-nav shadow-sm'>
				<div className='d-flex flex-column ml-5 mt-3'>
					<img className='avatar' src={avatar} alt='user' />
					<h6 className='py-2 pl-1'>{fullname}</h6>
				</div>
			</li>
			{getMenus(role, props.active || 'My account')}
		</ul>
	);
}

export default SideNav;
