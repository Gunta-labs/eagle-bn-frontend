import React from 'react';
import avatar from '../../Assets/images/bob.jpg';
import { faUser, faComment, faFileAlt, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
	return (
		<>
			<html lang='en' />
			<head>
				<meta charset='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta http-equiv='X-UA-Compatible' content='ie=edge' />
				<title>Barefoot-Nomad</title>
			</head>
			<nav class='navbar navbar-expand-lg bg-light fixed-top shadow-sm'>
				<a class='navbar-brand' href='/'>
					Sidebar Nav
				</a>
				<button
					class='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarCollapse'
					aria-controls='navbarCollapse'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span class='navbar-toggler-icon'></span>
				</button>

				<div class='collapse navbar-collapse' id='navbarCollapse'>
					<ul class='navbar-nav mr-auto sidenav shadow-sm' id='navAccordion'>
						<li class='nav-item active user-nav shadow-sm'>
							<div className='d-flex flex-column ml-5 mt-3'>
								<img class='avatar' src={avatar} alt='user' />
								<h6 className='py-2 pl-1'>my name</h6>
							</div>
						</li>
						<li class='nav-item m-2'>
							<a class='nav-link text-secondary' href='/'>
								<FontAwesomeIcon icon={faUser} />
								<span className='ml-3'>My account</span>
							</a>
						</li>
						<li class='nav-item m-2'>
							<a class='nav-link' href='/'>
								<FontAwesomeIcon icon={faClipboard} />
								<span className='ml-3'>Trips requests</span>
							</a>
						</li>
						<li class='nav-item m-2 '>
							<a class='nav-link' href='/'>
								<FontAwesomeIcon icon={faComment} />
								<span className='ml-3'>Comments</span>
							</a>
						</li>
						<li class='nav-item m-2'>
							<a class='nav-link' href='/'>
								<FontAwesomeIcon icon={faFileAlt} />
								<span className='ml-3'>History</span>
							</a>
						</li>
					</ul>
					<form class='form-inline ml-auto mt-2 mt-md-0'>
						<input
							class='form-control mr-sm-2'
							type='text'
							placeholder='Search'
							aria-label='Search'
						/>
						<button class='btn btn-outline-success my-2 my-sm-0' type='submit'>
							Search
						</button>
					</form>
				</div>
			</nav>
		</>
	);
}
export default Header;
