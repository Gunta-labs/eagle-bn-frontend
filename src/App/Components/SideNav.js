import React from 'react';
import avatar from '../../Assets/images/bob.jpg';
import { faUser, faComment, faFileAlt, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SideNav() {
	return (
		<ul className='navbar-nav mr-auto sidenav shadow-sm' id='navAccordion'>
			<li className='nav-item active user-nav shadow-sm'>
				<div className='d-flex flex-column ml-5 mt-3'>
					<img className='avatar' src={avatar} alt='user' />
					<h6 className='py-2 pl-1'>my name</h6>
				</div>
			</li>
			<li className='nav-item m-2'>
				<a className='nav-link text-secondary' href='/'>
					<FontAwesomeIcon icon={faUser} />
					<span className='ml-3'>My account</span>
				</a>
			</li>
			<li className='nav-item m-2'>
				<a className='nav-link' href='/'>
					<FontAwesomeIcon icon={faClipboard} />
					<span className='ml-3'>Trips requests</span>
				</a>
			</li>
			<li className='nav-item m-2 '>
				<a className='nav-link' href='/'>
					<FontAwesomeIcon icon={faComment} />
					<span className='ml-3'>Comments</span>
				</a>
			</li>
			<li className='nav-item m-2'>
				<a className='nav-link' href='/'>
					<FontAwesomeIcon icon={faFileAlt} />
					<span className='ml-3'>History</span>
				</a>
			</li>
		</ul>
	);
}

export default SideNav;
