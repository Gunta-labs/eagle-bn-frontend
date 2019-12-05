import React from 'react';

function Header() {
	return (
		<header>
			<nav className='navbar navbar-expand-md navbar-light fixed-top bg-transparent shadow-sm'>
				<a className='navbar-brand text-primary bold' href='/'>
					<h4 className='logo-txt'>Barefoot-Nomad</h4>
				</a>
				<button
					className='navbar-toggler collapsed'
					type='button'
					data-toggle='collapse'
					data-target='#navbarCollapse'
					aria-controls='navbarCollapse'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon' />
				</button>
				<div className='ml-auto navbar-collapse collapse' id='navbarCollapse'>
					<ul className='navbar-nav ml-auto'>
						<li className='nav-item active'>
							<a className='nav-link mx-3 ' href='/'>
								Home <span className='sr-only'>(current)</span>
							</a>
						</li>
						<li className='nav-item mx-3'>
							<a className='nav-link' href='/'>
								Acommodations
							</a>
						</li>
						<li className='nav-item mx-3'>
							<a className='nav-link mx-3' href='/signup'>
								Signup
							</a>
						</li>
						<li className='nav-item mx-3'>
							<a className='nav-link btn btn-primary btn-sm px-5' href='/login'>
								Login
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
export default Header;
