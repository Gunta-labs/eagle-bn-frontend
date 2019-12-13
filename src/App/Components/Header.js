import React from 'react';
import SideNav from './SideNav';
import logo from '../../Assets/images/eagle-logo.svg';

class Header extends React.Component {
	state = {
		show: false,
	};
	handleClick = () => {
		const currentState = this.state.show;
		this.setState({ show: !currentState });
	};
	render() {
		const { showSideNav } = this.props;
		return (
			<>
				<head>
					<meta charSet='UTF-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1.0' />
					<meta httpEquiv='X-UA-Compatible' content='ie=edge' />
					<title>Barefoot-Nomad</title>
				</head>
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
						className={
							this.state.show ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'
						}
						id='navbarCollapse'
					>
						{showSideNav && <SideNav active={this.props.active_menu} />}
						{!showSideNav && (
							<ul className='navbar-nav ml-auto'>
								<li className='nav-item active'>
									<a className='nav-link mx-3 ' href='/'>
										Home <span className='sr-only'>(current)</span>
									</a>
								</li>
								<li className='nav-item mx-3'>
									<a className='nav-link' href='/'>
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
					</div>
				</nav>
			</>
		);
	}
}
export default Header;
