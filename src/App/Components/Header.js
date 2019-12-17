import React from 'react';
import SideNav from './SideNav';
import logo from '../../Assets/images/eagle-logo.svg';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Token from '../../helper/helper';
import LogoutButton from './logout.component';

class Header extends React.Component {
	state = {
		show: false,
	};
	handleClick = () => {
		const currentState = this.state.show;
		this.setState({ show: !currentState });
	};
	render() {
		const validToken = Token();
		const { showSideNav } = this.props;
		return (
			<nav className='navbar navbar-expand-lg bg-light navbar-light fixed-top shadow-sm'>
				<a className='navbar-brand text-primary' href='/'>
					<div>
						<img className='logo' src={logo} alt='logo' />
						<span className='font-weight-bold'>Barefoot</span>
					</div>
				</a>
				<button
					onClick={this.handleClick}
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarCollapse'
					aria-controls='navbarCollapse'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div
					className={this.state.show ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'}
					id='navbarCollapse'
				>
					{showSideNav && <SideNav active={this.props.active_menu} avatar={this.props.avatar} />}
					{!showSideNav && !validToken && (
						<ul className='navbar-nav ml-auto' id='main-menu'>
							<li className='nav-item active'>
								<a className='nav-link mx-3 ' href='/'>
									Home <span className='sr-only'>(current)</span>
								</a>
							</li>
							<li className='nav-item mx-3'>
								<a className='nav-link' href='/accomodations'>
									Accommodations
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
					)}
					{validToken && (
						<ul className='navbar-nav ml-auto'>
							<li className='nav-item active'>
								<a className='nav-link mx-3 ' href='/'>
									Home <span className='sr-only'>(current)</span>
								</a>
							</li>
							<li className='nav-item mx-3'>
								<div className='dropdown'>
									<button
										className='btn dropdown-toggle text-secondary'
										type='button'
										id='dropdownMenuButton'
										data-toggle='dropdown'
										aria-haspopup='true'
										aria-expanded='false'
									>
										<span className='profile pr-3'>
											<FontAwesomeIcon icon={faUser} />
										</span>
										{validToken && validToken.fullname}
									</button>
								</div>
							</li>
							<li className='nav-item mx-3'>
								<LogoutButton />
							</li>
						</ul>
					)}
				</div>
			</nav>
		);
	}
}
export default Header;
