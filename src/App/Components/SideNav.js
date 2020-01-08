import React from 'react';
import avatar from '../../Assets/images/avatar.png';
import {
	faUser,
	faFileAlt,
	faClipboard,
	faFileInvoice,
	faHotel,
	faClipboardCheck,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';

import checkToken from '../../helper/helper';
import Menu from '../Components/Menu';

const requestMenu = [
	{ name: 'my account', icon: faUser, active: true, link: '/dashboard' },
	{ name: 'my requests', icon: faClipboard, active: true, link: '/requests' },
	{ name: 'trip request', icon: faPlus, active: false, link: '/request/create' },
	{ name: 'Bookings', icon: faFileInvoice, active: false, link: '/bookings' },
];
const supplierMenu = [
	{ name: 'my account', icon: faUser, active: true, link: '/dashboard' },
	{ name: 'accommodations', icon: faHotel, active: false, link: '/accommodations' },
	{ name: 'accommodation', icon: faPlus, active: true, link: '/accommodation/create' },
	{ name: 'booking', icon: faFileAlt, active: false, link: '/accommodations' },
];
const managerMenu = [
	{ name: 'my account', icon: faUser, active: true, link: '/dashboard' },
	{ name: 'My Approvals', icon: faClipboardCheck, active: false, link: '/manager' },
];
const adminMenu = [
	{ name: 'my account', icon: faUser, active: false, link: '/dashboard' },
	{ name: 'users', icon: faUser, active: true, link: '/admin' },
	{ name: 'comments', icon: faFileAlt, active: false, link: '/comments' },
];
function getMenus(role, active) {
	switch (role || 'requester') {
		case 'requester':
			return requestMenu.map((menu, index) => (
				<Menu
					name={menu.name}
					active={index === active}
					icon={menu.icon}
					link={menu.link}
					key={index}
				/>
			));
		case 'host':
			return supplierMenu.map((menu, index) => (
				<Menu
					name={menu.name}
					active={index === active}
					icon={menu.icon}
					link={menu.link}
					key={index}
				/>
			));
		case 'Tadmin':
			return supplierMenu.map((menu, index) => (
				<Menu
					name={menu.name}
					active={index === active}
					icon={menu.icon}
					link={menu.link}
					key={index}
				/>
			));
		case 'manager':
			return managerMenu.map((menu, index) => (
				<Menu
					name={menu.name}
					active={index === active}
					icon={menu.icon}
					link={menu.link}
					key={index}
				/>
			));
		case 'admin':
			return adminMenu.map((menu, index) => (
				<Menu
					name={menu.name}
					active={index === active}
					icon={menu.icon}
					link={menu.link}
					key={index}
				/>
			));
		default:
			return '';
	}
}

function SideNav(props) {
	const { role, fullname } = checkToken() || {};
	return (
		<ul className='navbar-nav mr-auto sidenav shadow-sm' id='navAccordion'>
			<li className='nav-item user-nav shadow-sm'>
				<div className='d-flex flex-column ml-5 mt-3'>
					<img
						height='100'
						width='100'
						className='avatar'
						src={props.avatar || avatar}
						alt='user'
					/>
					<h6 className='py-2 pl-1'>{fullname}</h6>
				</div>
			</li>
			{getMenus(role, props.active || 0)}
		</ul>
	);
}

export default SideNav;
